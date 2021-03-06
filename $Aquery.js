
const $Aquery = function foo(query, parent = document){
	return (function ($aquery){

			if (typeof query == "string"){
				query = query.split(" ");
				
				// console.log("query: ", query)
				
				for (let i = 0; i<query.length; i++){
					
					if (query[i].charAt(0) == "#")
						parent = parent.getElementById(query[i].substr(1));
					else{ 
						if (query[i].charAt(0) == "."){
							parent = parent.getElementsByClassName(query[i].substr(1));
							
							if (parent.length == 1) parent = parent[0];
						}
						else
							parent = parent.getElementsByTagName(query[i]);
							
							if (parent.length == 1) parent = parent[0]
						if ( ! isNaN(query[i+1])){							
							i++;
							parent = parent[query[i]];
						}
					}
				}
				
				$aquery.raw = parent;
				
			}
			else if (query instanceof Element || query instanceof HTMLCollection){
				$aquery.raw = query;
			}
			
			if ($aquery.raw instanceof Element){	//element type
				$aquery.on = function(type, callback){
					this.raw.addEventListener(type, callback);
				}
				
				$aquery.text = function(text){
					this.raw.innerHTML = text;
				}
				
				$aquery.append = function(html){ this.raw.innerHTML += html }
				
				$aquery.remove = function(){
					return this.raw.parentElement.removeChild(this.raw)
				}
				
				$aquery.$ = function(query){return foo(query , this.raw)}
				
				
			}
			else {	//collection
				$aquery.length = $aquery.raw.length;
			
				$aquery.first = function(){return foo( $aquery.raw[0] )};
				
				$aquery.last = function(){return foo( $aquery.raw[$aquery.raw.length -1] )};
				
				$aquery.at = function(index){ return foo( $aquery.raw[index]) };
				
				//doesnt seem to work?
				$aquery.on = function(type, callback){
					for (let i = 0; i>this.length; i++){
						this.raw[i].addEventListener(type, callback);
					}
				}
				
				$aquery.remove = function(){
					nodelist = this.raw[0].parentElement.removeChild(this.raw[0]);
					for (let i = 1; i< this.length; i++){
						
						if(this.raw[i] && this.raw[i].parentElement){
							nodelist += this.raw[i].parentElement.removeChild(this.raw[i]);
						}
						
					}
				}
				
			}
			return $aquery;
	})({})
};


// function append(node, html){
	// var template = document.createElement('template');
	// template.innerHTML = html;
	// return template.content.firstChild;
// }