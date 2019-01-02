class URL {

  constructor(app){
    this.init(app);
  }

  init(app){
    this.func = app.functions;
    this.actions = app.actions;
  }

  async getUrl(filename, type){
    //console.log('get url: ' + filename);
    const url = await this.func.url(filename, type);
    //console.log(url);
    if(!this.unmounted && url && url !== this.url){
      this.url = url;
      if(this.useBlob){
        this.blob = await this.urlToBlob(url);
      }
      //console.log('get url');
      this.actions.main.setStatus('ready');
    }
  }

  async urlToBlob(url){
    if(!url){ return null; }
    const res = await fetch(url).catch(err=>{ return null; });
    const blob = await res.blob().catch(err=>{ return null; });
    return blob;
  }

  componentWillUnmount(){ this.unmounted = true; }

}

export default URL;
