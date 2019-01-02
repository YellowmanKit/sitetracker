import encodeWAV from './waveEncoder';

export default class WAVEInterface {
  static audioContext = null;
  constructor(app){
    this.message = app.actions.modal.message;
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    if (window.AudioContext) {
      WAVEInterface.audioContext = new window.AudioContext();
    }else{
      this.audioContextMissingMessage();
    }
  }

  audioContextMissingMessage(){
    this.message(['Audio context is not available!', '無法使用錄音功能!']);
  }

  //static audioContext = new AudioContext();
  static bufferSize = 2048;

  playbackNode: AudioBufferSourceNode;
  recordingNodes: AudioNode[] = [];
  recordingStream: MediaStream;
  buffers: Float32Array[][];
  encodingCache: Blob;

  get bufferLength() { return this.buffers[0].length * WAVEInterface.bufferSize; }
  get audioDuration() { return this.bufferLength / WAVEInterface.audioContext.sampleRate; }
  get audioData() {
    return this.encodingCache || this.encode(this.buffers);
  }

  encode(buffers){
    return encodeWAV(buffers, this.bufferLength, WAVEInterface.audioContext.sampleRate);
  }

  startRecording() {

    return new Promise((resolve, reject) => {
      if(navigator.getUserMedia !== undefined){
        navigator.getUserMedia({ audio: true }, (stream) => {
          this.processingStream(stream);
          resolve(stream);
        }, (err) => {
          reject(err);
        });
      }else if(navigator.mediaDevices !== undefined){
        navigator.mediaDevices.getUserMedia({ audio: true }, (stream) => {
          this.processingStream(stream);
          resolve(stream);
        }, (err) => {
          reject(err);
        });
      }else{
        const msg = 'no navigator getUserMedia!'
        this.message([msg,msg]);
      }
    });
  }

  processingStream(stream){
    const { audioContext } = WAVEInterface;
    const recGainNode = audioContext.createGain();
    const recSourceNode = audioContext.createMediaStreamSource(stream);
    const recProcessingNode = audioContext.createScriptProcessor(WAVEInterface.bufferSize, 2, 2);
    if (this.encodingCache) this.encodingCache = null;

    recProcessingNode.onaudioprocess = (event) => {
      if (this.encodingCache) this.encodingCache = null;
      // save left and right buffers
      for (let i = 0; i < 2; i++) {
        const channel = event.inputBuffer.getChannelData(i);
        this.buffers[i].push(new Float32Array(channel));
      }
    };

    recSourceNode.connect(recGainNode);
    recGainNode.connect(recProcessingNode);
    recProcessingNode.connect(audioContext.destination);

    this.recordingStream = stream;
    this.recordingNodes.push(recSourceNode, recGainNode, recProcessingNode);
  }

  stopRecording() {
    if (this.recordingStream) {
      this.recordingStream.getTracks()[0].stop();
      delete this.recordingStream;
    }
    for (let i in this.recordingNodes) {
      this.recordingNodes[i].disconnect();
      delete this.recordingNodes[i];
    }
  }

  startPlayback(loop: boolean = false, audioData, onended: () => void) {
    return new Promise((resolve, reject) => {
      if(audioData instanceof Blob){
        const reader = new FileReader();
        reader.readAsArrayBuffer(audioData);
        reader.onloadend = () => {
          resolve(this.decodeAudioData(reader.result, loop, onended))
        };
      }else{
        this.decodeAudioData(audioData.slice(0), loop, onended)
      }
    }).catch(err=>{
      console.log(err);
    });
  }

  decodeAudioData(arrayBuffer, loop, onended){
    //console.log(arrayBuffer);
    if(!WAVEInterface.audioContext){
      this.audioContextMissingMessage();
      return null;
    }
    if(typeof WAVEInterface.audioContext.decodeAudioData !== "function"){
      this.message(['decodeAudioData missing','decodeAudioData missing']);
      return null;
    }
    if(!arrayBuffer){
      this.message(['arraybuffer missing','arraybuffer missing']);
      return null;
    }

    WAVEInterface.audioContext.decodeAudioData(arrayBuffer, (buffer) => {
      const source = WAVEInterface.audioContext.createBufferSource();
      source.buffer = buffer;
      source.connect(WAVEInterface.audioContext.destination);
      source.loop = loop;
      source.start(0);
      source.onended = onended;
      this.playbackNode = source;
      return source;
    }).catch(error=>{
      console.log(error);
    });
  }

  stopPlayback() {
    this.playbackNode.stop();
  }

  reset() {
    if (this.playbackNode) {
      this.playbackNode.stop();
      this.playbackNode.disconnect(0);
      delete this.playbackNode;
    }
    this.stopRecording();
    this.buffers = [[], []];
  }
}
