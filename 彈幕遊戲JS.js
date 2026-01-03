const story = [
	[
		"你好阿......人類",
		"今天天氣真不錯呢",
		"看看窗外吧~~",
		"......",
		"看完了嗎?",
		"就當你看完了吧",
		"那我們來玩個遊戲吧",
		"等等你左邊會生成一些箭頭",
		"盡量去碰它們",
		"會很很舒服的喔",
	],
	[
		"!?......",
		"竟然還活著嗎?",
		"可惡...",
		"沒被我騙到嗎?",
		"真有趣呢~",
		"那就繼續吧",
	],
	[
		"!!!",
		"我地媽媽咪呀!!!",
		"你竟然還活著!!!???",
		"......",
		"難以置信~~~",
		"可惜......",
		"應該也就這樣了",
	],
	[
		"!!!!!",
		"沒死!!!???",
		"你真厲害!!!",
		"那麼......",
		"我要出全力了喔",
		"來吧",
		"最後一戰",
	],
	[
		"......",
		"謝謝你擊敗了我",
		"下次見",
	],
];

const story_text = document.getElementById("text")
let now_big_story_text = 0
let now_story_text = 0
let now_text = 0

function type(){
	if (now_big_story_text < story.length){	
		const fulltext=story[now_big_story_text][now_story_text]
		if (now_text < fulltext.length){
			story_text.textContent +=fulltext.charAt(now_text);
			if (now_text === 17 ){
				story_text.textContent +="\n";
			}
			now_text++;
			setTimeout(type,150);
		}
		else{
			setTimeout(next,1000);
		}
	}
	else{
			window.location.href="戰勝/戰勝HTML.html";
		}
}

function next(){
	now_story_text++;
	if (now_story_text < story[now_big_story_text].length){
		story_text.textContent = "";
		now_text = 0
		type();
		}
	else{
		story_text.textContent = "";
		now_story_text = 0
		now_text = 0
		setTimeout(battle,800)
		let Detection = setInterval(impact,10);
		setInterval(()=>{clearInterval(Detection)},8500);
	}
}

let battle_space_size= document.getElementById("battle_space");
let user_size = document.getElementById("user");

let bw = battle_space_size.offsetWidth;
let bh = battle_space_size.offsetHeight;
let pw = user_size.offsetWidth;
let ph = user_size.offsetHeight;

let max_h = bh - ph;
let max_w = bw - pw;
let min_h = 0;
let min_w = 0;

let move = document.querySelector("body");
	move.addEventListener("keydown", function(event){
	let x = user_size.offsetLeft || 0;
	let y = user_size.offsetTop || 0;

	let key = event.key;
	let now_x=x;
	let now_y=y;
	switch(key){
		case "ArrowUp":
			now_y -= 10;
			now_y = Math.max(now_y,min_h);
 			user_size.style.top = now_y + 'px';
			break;

		case "ArrowDown":
			now_y += 10;
			now_y = Math.min(now_y,max_h);
			user_size.style.top = now_y + 'px';			
			break;
		
		case "ArrowLeft":
			now_x -= 10;
			now_x = Math.max(now_x,min_w);
			user_size.style.left = now_x + 'px';
			break;
		
		case "ArrowRight":
			now_x += 10;
			now_x = Math.min(now_x,max_w);
			user_size.style.left = now_x + 'px';
			break;
	}
});

function attack_1(){
	let max_h_attack_1 = bh - 60;
	//在X為50,Y為battle_space_size5j的隨機高度中生成一個div
	let attack_1_y = max_h_attack_1/2;
	let attack_1_x = 50
	//創建一個div且設類別為bullet
	let attack_1 = document.createElement("div");
	attack_1.className="bolltom_1  bullet";
	attack_1.style.left = attack_1_x + "px";
	attack_1.style.top = attack_1_y + "px";
	//生成在空間battle_space_up裡且2000豪秒後消失
	document.getElementById("battle_space_up").appendChild(attack_1);
	setTimeout(() => attack_1.remove(), 3500);
}

function attack_2(){
	let min_w_attack_2 = btw*0.2;
	let max_w_attack_2 = btw*0.8;
	let attack_2_x = Math.floor(Math.random() * (max_w_attack_2 - min_w_attack_2))+min_w_attack_2;
	let attack_2_y = 0;
	let attack_2_z = 999;
	let attack_2 = document.createElement("div");
	attack_2.className="bolltom_2  bullet";
	attack_2.style.left = attack_2_x + "px";
	attack_2.style.top = attack_2_y + "px";
	attack_2.style.zIndex = attack_2_z ;
	document.getElementById("battle_space_top").appendChild(attack_2);
	setTimeout(() => attack_2.remove(), 2000);
}

function attack_3(){
	let max_h_attack_3 = bh - 60;
	let attack_3_y = Math.floor(Math.random() * max_h_attack_3);
	let attack_3_x = 50
	let attack_3 = document.createElement("div");
	attack_3.className="bolltom_1  bullet";
	attack_3.style.left = attack_3_x + "px";
	attack_3.style.top = attack_3_y + "px";
	document.getElementById("battle_space_up").appendChild(attack_3);
	setTimeout(() => attack_3.remove(), 3500);
}

function attack_4(){
	attack_3();
	attack_2();
}


function attack_5(){
	now_big_story_text++;
	type();
}

let attack_list=[attack_1,attack_2,attack_3,attack_4,attack_5];
let now_attack=0;

let battle_space_top_size= document.getElementById("battle_space_top");
let btw = battle_space_top_size.offsetWidth;

function battle(){
	const attack = setInterval(() => {attack_list[now_attack]();}, 500);
	setTimeout(()=>{clearInterval(attack);now_big_story_text ++;setTimeout(()=>{type();now_attack++},3500);},5000);
}


function impact(){
	let user_Location = user_size.getBoundingClientRect();
	
	let all_bolltom =  document.querySelectorAll(".bullet");

	all_bolltom.forEach((one_bolltom) =>{

		let bullet_Location = one_bolltom.getBoundingClientRect();

		let x_not_impact= bullet_Location.left    >  user_Location.right || bullet_Location.right   <  user_Location.left;
		let y_not_impact= bullet_Location.bottom  <  user_Location.top   || bullet_Location.top     >  user_Location.bottom;
		let impacting = !(x_not_impact) && !(y_not_impact);

		if (impacting){
			window.location.href="戰敗/戰敗HTML.html";
		}
	});
}

//網頁開啟時便開始打字
type();

