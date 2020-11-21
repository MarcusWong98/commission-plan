export function cal(origin, multiplier){

    if(origin > 30000){
        
        value += multiplier > 0.28 ? (30000*0.28) : (30000 * multiplier);

        multiplier += 0.04;

        console.log(value);

        origin -= 30000;

        cal(origin, multiplier);
    }else{
        value += multiplier > 0.28 ? (origin*0.28) : (origin*multiplier);
    }

}