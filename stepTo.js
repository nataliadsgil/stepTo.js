var stepTo = function(data){
	return new Promise((resolve, reject) => {
		if(data.steps){

			var width = 100/data.steps.length;	

			//Criando container principal
			var stepToContent = document.createElement("div");
			stepToContent.classList.add('step-to-step');

			// var html = "<div class='step-to-step'>";


			data.steps.forEach(function(item, i){
				
				var step = document.createElement("div");
				step.classList.add('step');
				step.style.width = width+"%";
				step.innerHTML   = item.label;

				var number_step = document.createElement("div");
				number_step.classList.add('number');
				number_step.innerHTML = (i + 1);

				step.appendChild(number_step);
				
				if(i == 0){
					step.classList.add('step-current');

					// html += "<div class='step step-current' style='width: "+width+"%;'>"+item.label+"<div class='number'>"+(i + 1)+"</div></div>";
				}
				else{
					// html += "<div class='step' style='width: "+width+"%;'>"+item.label+"<div class='number'>"+(i + 1)+"</div></div>";
				}

				stepToContent.appendChild(step);
			});

			// html += "</div>";

			var container = document.getElementById(data.container);

			container.style.width = "100%";

			// container.innerHTML = html;
			container.appendChild(stepToContent);

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