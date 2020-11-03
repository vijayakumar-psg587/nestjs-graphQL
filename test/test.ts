import {IsNotEmpty, IsString, IsUUID, Length, validate} from "class-validator";
import {Expose, plainToClass, Transform} from "class-transformer";

class Test {
    @Expose()
    @IsString()
    @Length(12, 4, {each:true, always: true})
    tab;
}

const obj = new Test();
obj.tab = 12;

try {
   const res = validate(obj).then(data => {
       console.log(plainToClass(Test,obj));
   }).catch(err => {
       console.log('err',err);
   })

}catch (err) {
    console.log('err:',err);
}
