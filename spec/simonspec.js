describe("set of tests", function () {
  beforeAll(function () {
    var temp = '<div id="mssg"><p></p></div><div id="outer-circle"> <button type="button" id="button-1" onclick="addPlayerMove("button-1")"></button> <button type="button" id="button-2" onclick="addPlayerMove("button-2")"></button> <button type="button" id="button-3" onclick="addPlayerMove("button-3")"></button> <button type="button" id="button-4" onclick="addPlayerMove("button-4")"></button> <div id="inner-circle"> <div id="inner-circle-content"> <h2 id="text-font">Simon</h2> <input type="text" id="strict" readonly> <br><div><input type="text" name="counter" size="5px" placeholder="" id="count"> <font id="label1">COUNT</font> </div><d> <button type="button" id="button-5" onclick="start()" value="start"></button> <font id="label2">START</font> </d iv> <div><button type="button" id="button-6" onclick="setStrict()"></button> <font id="label3">STRICT</font> </div><div id="switch-container"> <font id="label4">OFF</font> <label class="switch"> <input type="checkbox" onclick="toggle()" id="check"> <span class="slider"></span> </label> <font id="label5">ON</font> </div></div></div></div></div><audio id="Green"> <source src="assets/audio/Green.mp3" </source> <source src="assets/audio/Green.ogg"> </audio> <audio id="Red"> <source src="assets/audio/Red.mp3" </source> <source src="assets/audio/Red.ogg"> </audio> <audio id="Yellow"> <source src="assets/audio/Yellow.mp3" </source> <source src="assets/audio/Yellow.ogg"> </audio> <audio id="Blue"> <source src="assets/audio/Blue.mp3" </source> <source src="assets/audio/Blue.ogg"> </audio> <audio id="Wrong"> <source src="assets/audio/Wrong.ogg"> <source src="assets/audio/Wrong.ogg"> </audio>';
    document.body.insertAdjacentHTML("afterbegin", temp);
  });
  
  describe("reset if function test", function () {
    it("should call setstrict", function () {
       game.strict = true;
      var spy = GameObject;
      spyOn(spy, 'setStrict');
      GameObject.reset();
      expect(spy.setStrict).toHaveBeenCalled();
    });
  });

  describe("test game object", function () {
    it("test", function () {
      expect(game.stage).toBe(0);
      expect(game.strict).toBe(false);
    });
  });

  describe("setstrict function test", function () {
    it("test", function () {
      document.getElementById("check").checked = true;
      GameObject.setStrict();
      game.srict = false;
      expect(document.getElementById("strict").style.backgroundColor).toBe("red");
    });
  });

  describe("check setstrict function test two", function () {
   it("should be black", function () {
      document.getElementById("check").checked = false;
      GameObject.setStrict();
      expect(document.getElementById("strict").style.backgroundColor).toBe("black");
    });
  });

  describe("displayCount test", function () {
    it("display count test", function () {
      game.stage = '19';
      GameObject.displayCount();
      expect(document.getElementById("count").value).toBe(game.stage);
    });
  });

  describe("check setstrict function test", function () {
    it("test", function () {
      document.getElementById("check").checked = true;
      GameObject.setStrict();
      game.srict = true;
      expect(document.getElementById("strict").style.backgroundColor).toBe("black");
    });
  });

  describe("showMove test", function () {
    var id = "button-1";
    it("should change opacity", function () {
      document.getElementById("check").checked = true;
      GameObject.showMove(id);
      expect(document.getElementById(id).style.opacity).toBe('0.6');
    });
    it("should change opacity", function () {
      document.getElementById("check").checked =false;
      GameObject.showMove(id);
      expect(GameObject.showMove()).toBe(56);
    });
  });

  describe("addPlayermove tese", function () {
    beforeEach(function () {
      document.getElementById("check").checked = false;
      GameObject.addPlayerMove();
    });
    it("should return something", function () {
      expect(GameObject.addPlayerMove()).toBe(5);
    });
  });
  
  describe("audio test", function () {
    it("audio one", function () {
      GameObject.playAudio("button-2");
    });
    it("audio two", function () {
      GameObject.playAudio("button-3");
    });
    it("audio four", function () {
      GameObject.playAudio("button-4");
    });
  });

  describe("start function test", function () {
    it("should call addcount", function () {
      var spy = GameObject;
      spyOn(spy,'addCount');
      GameObject.start();
      expect(spy.addCount).toHaveBeenCalled();
    });
  });
  
  describe("Add count test", function () {
    it("should call displaycount", function () {
      var spy = GameObject;
      spyOn(spy,'displayCount');
      GameObject.addCount();
      expect(spy.displayCount).toHaveBeenCalled();
    });
    it("should call generate sequence", function () {
      var spy = GameObject;
      spyOn(spy, 'generateSequence');
      GameObject.addCount();
      expect(spy.generateSequence).toHaveBeenCalled();
    });
  });
  
  describe("window onload test",function(){
   it("buttonDIsable shoub be called",function(){
    var spy=GameObject;
    spyOn(spy,'buttonDisable');
    window.onload();
    expect(spy.buttonDisable).toHaveBeenCalled();
   });
  });
  
  describe("generate sequence function test", function () {
    it("should call showsequence", function () {
      document.getElementById("check").checked = true;
      var spy = GameObject;
      spyOn(spy, 'showSequence');
      GameObject.generateSequence();
      expect(spy.showSequence).toHaveBeenCalled();
    });
  });
  
  describe("show sequence test", function () {
    it("should call buttonDisable", function () {
      document.getElementById("check").checked =true;
      game.stage = 1;
      var spy = GameObject;
      spyOn(spy, 'buttonDisable');
      spy.showSequence();
      expect(spy.buttonDisable).toHaveBeenCalled();
      expect(document.getElementById("count").value).toBe("0" + game.stage);
    });

    it("should change count", function () {
      document.getElementById("check").checked =true;
      game.stage = '11';
      GameObject.showSequence();
      expect(document.getElementById("count").value).toBe(game.stage);
    });
    
    it("is set timeout test", function () {
      document.getElementById("check").checked =true;
      game.stage = 1;
      game.currentSequence = ["button-1"];
      jasmine.clock().install();
      var spy = GameObject;
      spyOn(spy, 'showMove');
      spy.showSequence();
      jasmine.clock().tick(801);
      expect(spy.showMove).toHaveBeenCalled();
      jasmine.clock().uninstall();
    });
    
    it("is also set timeout test", function () {
      jasmine.clock().install();
      var spy = GameObject;
      spyOn(spy, 'buttonEnable');
      spy.showSequence();
      jasmine.clock().tick(game.stage * 1000);
      jasmine.clock().uninstall();
    });
    
    it("spy testing", function () {
      document.getElementById("check").checked = true; 
      game.stage = 0;
      game.currentSequence = [];
      GameObject.showSequence();
      expect(GameObject.showSequence()).toBe(22);
    });
    
    it("",function(){
      document.getElementById("check").checked = false;
      GameObject.showSequence();
      expect(GameObject.showSequence()).toBe(23);
    });
  });

  describe("show move test", function () {
    var id = "button-1";
    it("", function () {
      jasmine.clock().install();
      document.getElementById("check").checked = true;
      GameObject.showMove(id);
      expect(document.getElementById(id).style.opacity).toBe("0.6");
      jasmine.clock().tick(301);
      expect(document.getElementById(id).style.opacity).toBe("1");
      jasmine.clock().uninstall();
    });
  });

  describe("wrong blink test", function () {
    it("should set value", function () {
      game.stage = 0;
      jasmine.clock().install();
      GameObject.wrongBlink();
      jasmine.clock().tick(201);
      expect(document.getElementById("count").value).toBe("!" + " " + "!");
      jasmine.clock().uninstall();
    });
    it("", function () {
      game.stage = 1;
      jasmine.clock().install();
      GameObject.wrongBlink();
      jasmine.clock().tick(201);
      var spy = GameObject;
      spyOn(spy,'displayCount');
      jasmine.clock().uninstall();
    });

  });
  
  describe("playerTurn test", function () {
    beforeEach(function () {
      game.strict = true;
      document.getElementById("check").checked = true;
    });
    it("testing", function () {
      var spy = GameObject;
      spyOn(spy, 'playerTurn');
      spy.addPlayerMove();
      expect(spy.playerTurn).toHaveBeenCalled();
    });
  });

  describe("ToggleTest", function () {
    it("should", function () {
      document.getElementById("check").checked = false;
      var spy = GameObject;
      spyOn(spy, 'reset');
      GameObject.toggle();
      expect(spy.reset).toHaveBeenCalled();
    });
    it("should", function () {
      document.getElementById("check").checked = true;
      GameObject.toggle();
      expect(document.getElementById("count").value).toBe("--");
    });

  });
  
  describe("buttonEnable", function () {
    it("should return 5", function () {
      expect(GameObject.buttonEnable()).toBe(5);
    });
  });

  describe("player turn", function () {
    beforeEach(function () {
      var length1 = game.playerMoves.length;
      var length2 = game.currentSequence.length;
      game.playerMoves = ["button-1"];
      game.currentSequence = ["button-1"];
    });
    it("testing", function () {
      game.playerMoves = ["button-1"];
      game.currentSequence = ["button-1,button-2"];
      document.getElementById("check").checked = true;
      game.strict = true;
      var spy = GameObject;
      spyOn(spy, 'buttonDisable');
      spy.playerTurn();
      expect(spy.buttonDisable).toHaveBeenCalled();
    });

    it("testing", function () {
      game.playerMoves = ["button-1"];
      game.currentSequence = ["button-1,button-2"];
      document.getElementById("check").checked = true;
      game.strict = false;
      var spy = GameObject;
      spyOn(spy, 'buttonDisable');
      spy.playerTurn();
      expect(spy.buttonDisable).toHaveBeenCalled();
    });

    it("testing", function () {
      document.getElementById("check").checked = false;
      game.strict = false;
      var spy = GameObject;
      spyOn(spy, 'addCount');
      spy.playerTurn();
      expect(spy.addCount).toHaveBeenCalled();
    });

    it("testing", function () {
      document.getElementById("check").checked = false;
      game.strict = false;
      game.stage = 20;
      jasmine.clock().install();
      
      GameObject.playerTurn();
      expect(document.getElementById("mssg").innerHTML).toEqual("YOU WON");
      jasmine.clock().tick(2001);
      expect(document.getElementById("mssg").innerHTML).toBe("");
     
    });
  });
});
