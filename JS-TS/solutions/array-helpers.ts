
export function mapArray<T, R>(source: readonly T[], mapper: (item: T, index: number) => R): R[] {
  if(source==null){
  throw new TypeError('Source cannot be null or undefined');}
  const result:R[]=[];
  for(let i=0;i<source.length;i++){
const newArr=mapper(source[i],i);
result.push(newArr);
  }
  return result;
}

export function filterArray<T>(source: readonly T[], predicate: (item: T, index: number) => boolean): T[] {
 if(source==null){
  throw new TypeError('Source cannot be null or undefined');}
  const result:T[]=[];
  for(let i=0;i<source.length;i++){
   const True= predicate(source[i],i);
    if(True){

    result.push(source[i]);}
  }
  return result;
}

export function reduceArray<T, R>(source: readonly T[], reducer: (acc: R, item: T, index: number) => R, initial: R): R {
  if(source==null){
  throw new TypeError('Source cannot be null or undefined');}
  let acc=initial;
  for(let i=0;i<source.length;i++){
    acc= reducer(acc,source[i],i);
    
  }
  return acc;
}

export function partition<T>(source: readonly T[], predicate: (item: T) => boolean): [T[], T[]] {
  if(source==null){
  throw new TypeError('Source cannot be null or undefined');}
  const pass: T[] = [];
const fail: T[] = [];
for(let i=0;i<source.length;i++){
    const New=predicate(source[i]);
    if(New){
      pass.push(source[i]);
    }
    else{
      fail.push(source[i]);
    }
    
  }
  return [pass,fail];
}

export function groupBy<T, K extends PropertyKey>(source: readonly T[], keySelector: (item: T) => K): Record<K, T[]> {
   if(source==null){
  throw new TypeError('Source cannot be null or undefined');}
  const result = {} as Record<K, T[]>;
  for(let i=0;i<source.length;i++){
   const key = keySelector(source[i]);
   if (!result[key]) {
    result[key] = [];
}
    result[key].push(source[i]);
  }
  return result;
}
