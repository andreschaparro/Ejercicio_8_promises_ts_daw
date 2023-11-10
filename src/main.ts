class Main implements EventListenerObject, GETResponseListener {
    private _myf:MyFramework;
    private _counter:number = 0;

    handleEvent(evt:Event): void {
        this._counter++;
        let btn:HTMLElement = this._myf.getElementByEvent(evt);
        btn.textContent = `click: ${this._counter}`;
    }

    handleGETResponse(status:number, response:string): void {
        console.log(`Llego status ${status} response: ${response}`);
    }

    main(): void {
        this._myf = new MyFramework();
        let b:HTMLElement = this._myf.getElementById("boton");
        console.log(b);
        b.textContent = "Haceme click!";
        b.addEventListener("click", this);
        //this._myf.requestGET("Devices.txt", this);
        this._myf.requestGETProm("devices.txt").then((r:HttpResponse) => {
            console.log(`Llego status ${r.state} response: ${r.data}`);
            console.log("this vale:");
            console.log(this);
        }).catch((reason:HttpResponse) => {
            console.error(`Llego status ${reason.state}`);
        });
    }
}

window.onload = () => {
    let m:Main = new Main();
    m.main();
};