function GeoJSONtoWKT(geoJson){
	this.gj=geoJson;
		
	//For now we will just deal with Points, LineStrings & Polygons
	this.convert=function(){
		var wktText="";
		var Type=["POINT", "LINESTRING", "POLYGON"];
		var geomType=this.gj["type"]?this.gj["type"]:"";
		var coor=this.gj["coordinates"]?this.gj["coordinates"]:[];
		
		if((typeof geomType=="string")&&(coor instanceof Array)){
			geomType=geomType.toUpperCase();
			
			
			//now we see if the geomType is amongst the suitable types, by using a switch statement
			switch(geomType){
				case Type[0]: //point
					wktText=Type[0]+" ("+this.PointToString(coor)+")";
					break;
				case Type[1]:	//linestring
					wktText=Type[1]+" (";
					//now iterate over each point in the String
					var l=coor.length;
					for(var i=0;i<l;i++){
						wktText=wktText+this.PointToString(coor[i])+",";
					}
					//now remove the last comma
					wktText=wktText.substr(0,wktText.length-1);
					
					//add the ending bracket
					wktText=wktText+")";
					break;
				case Type[2]:	//Polygon
					wktText=Type[2]+" ("; 
					//now iterate over each ring
					var ringCount=coor.length;
					for(var i=0;i<ringCount;i++){
						//open bracket for the ring
						wktText=wktText+"(";
						//now iterate over each point in the ring
						var ptCount=coor[i].length;
						for(var j=0;j<ptCount;j++){
							var txt=this.PointToString(coor[i][j]);
							wktText=wktText+txt+",";
						}
						//remove the last comma in the ring
						wktText=wktText.substr(0,wktText.length-1);
						wktText=wktText+"),";
					}
					
					//remove the last comma in the polygon
					wktText=wktText.substr(0,wktText.length-1);
					wktText=wktText+")";
					break;
				default: //something else
				wktText="";
			}
			
		}
		return wktText;
		
		
	};
	
	this.PointToString=function(pt){
		var x=pt[0];
		var y=pt[1];
		if ((typeof x=="number")&&(typeof y=="number")){
		return x+" "+y;
		}else{
			return "";
		}
	};
	

}
