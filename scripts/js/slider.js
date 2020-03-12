$(document).ready( function() {

	//cria as variáveis modificáveis;
	var   numeroSlidesMostra =   4,
		  tempoIntervalo     =   2000;
	
	//cria dinamicamente elementos HTML
	$("div.slider").append('<div id="container"><div id="uls"></div></div><span id="title">Pausado</span><div id="controles"><button id="back"> < </button><button id="next"> > </button></div>');
	
	//cria as variáveis NÃO modificáveis;
	var   slider             =   $("div.slider"),
		  container          =   $(slider).find("div#container"),
		  uls                =   $(container).find("div#uls");
		  
	//adiciona a única ul inicialmente no HTML ao seu container criada dinamicamente 
	$("#uls").append($("ul.itens"));
		
	//após essa inserção, já podemos procurar os demais itens devidamente posicionados
	var	  ul                 =   $(uls).find("ul.itens"),
		  lis                =   $(ul).find("li"),
		  tamanhoLi          =   Math.round ( $(lis).first().outerWidth() ),
		  numeroLis          =   Math.round ( $(lis).length ),
		  tamanhoUl          =   Math.round ( tamanhoLi * numeroLis ),
		  controles          =   $(slider).find("div#controles"),
		  span               =   $(slider).find("span#title"),
		  btnVoltar          =   $(controles).find("button#back"),
		  btnAvancar         =   $(controles).find("button#next");
		
	//determina a largura da div que abrigará as UL's.	
	$(container).width(numeroSlidesMostra * tamanhoLi);
	//determina a largura das ULs partindo do produto entre a largura de cada LI e a quantidade de LI's
	$(ul).width(tamanhoUl);	
	//fazendo um clone no final da da div de ULs
	$(ul).clone().appendTo(uls);	
	
	//necessário pois nesse momento a primeira UL está colada no seu container (div.uls). Nesse caso, jogo a div.uls uma LI para a esquerda.
	$(uls).css("left" , -tamanhoLi ); 
	//após faço a compensação jogando a primeira UL para direita
	$(".itens").css("left" , +tamanhoLi );
	
	//função avançar
	function avancar () {
		
		$("ul.itens").each (function() {
			
			if ( Math.round ( $(this).position().left ) <= -Math.round ( $(ul).width() ) ) 
				$(this).css({
					"transition" : "none",
					"left"       : "+=" + ( ( 2 * tamanhoUl ) - tamanhoLi )
				}) ;
			else 			
				$(this).css({
					"transition" : "all 1s ease",
					"left"       : "-=" + tamanhoLi
				}) ;
			
		});
		
	}

	//função voltar
	function voltar () {
		
		$("ul.itens").each (function() {		
			
			if ( Math.round ( $(this).position().left ) >= Math.round ( $(container).width() ) ) 
				$(this).css({
					"transition" : "none",
					"left"       : "-=" + ( ( 2 * tamanhoUl ) - tamanhoLi )
				}) ;
			else 			
				$(this).css({
					"transition" : "all 1s ease",
					"left"       : "+=" + tamanhoLi
				}) ;
				
		});
		
	}

	//código do onClick no botão avancar
	btnAvancar.on("click", function (e) {
		
	  var btn = $(this);
	  btn.prop('disabled',true);
	  
	  clearInterval(loop);
	  avancar();
	  setTimeout(function(){
		btn.removeAttr('disabled');
	  }, 1000);
	  
	  loop = setInterval( avancar, tempoIntervalo);
	  
	});

	//código do onClick no botão voltar
	btnVoltar.on("click", function (e) {
		
	  var btn = $(this);
	  btn.prop('disabled',true);
	  
	  clearInterval(loop);
	  voltar();
	  setTimeout(function(){
		btn.removeAttr('disabled');
	  }, 1000);
	  
	  loop = setInterval( avancar, tempoIntervalo);
	  
	});

	
	//dispara o loop na função avançar
	var loop = setInterval( avancar, tempoIntervalo );		

	//para e reinicia o loop ao passar/retirar o mouse sobre o slide
	container.mouseover(function(){
		clearInterval(loop);
		//mostra a mensagem 
		span.css("display", "flex");
	}).mouseout(function(){
		loop = setInterval( avancar, tempoIntervalo );	
		//esconde a mensagem 
		span.css("display", "none");
	});
	
})
