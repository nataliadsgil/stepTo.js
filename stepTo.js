var stepTo = function(data){
	return new Promise((resolve, reject) => {
		if(data.steps){

			var width = 100/data.steps.length;
			var html = "<div class='step-to-step'>";

			data.steps.forEach(function(item, i){
				console.log(item, width);
				if(i == 0){
					html += "<div class='step step-current' style='width: "+width+"%;'>"+item.label+"<div class='number'>"+(i + 1)+"</div></div>";
				}
				else{
					html += "<div class='step' style='width: "+width+"%;'>"+item.label+"<div class='number'>"+(i + 1)+"</div></div>";
				}
			});

			html += "</div>";

			var container = document.getElementById(data.container);

			container.style.width = "100%";

			container.innerHTML = html;

			var next = document.getElementById(data.next);

			next.addEventListener("click", function(event){
				$(".step").each(function(i, item){
					if(item.classList.contains('step-current')){

						if(data.steps[i].action){
							try{
								window[data.steps[i].action]();
							}
							catch(err){
								console.error(err);
							}
						}
						
						if($(".step")[i+1]){
							item.classList.remove('step-current');
							item.classList.add('step-passed');
							$(".step")[i+1].classList.add('step-current');
							return false;
						}
						else{
							resolve({success: true});
						}
					}
				});
			});
		}
	});
}