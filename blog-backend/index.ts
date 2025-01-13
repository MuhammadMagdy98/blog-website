import zod from 'zod';


const schema = zod.object({
  name: zod.string(),
  age: zod.number(),
});