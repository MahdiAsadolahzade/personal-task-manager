export const Priorities = [
  { id: "1", name: "LOW" ,color:'primary' },
  { id: "2", name: "MEDIUM" ,color:'accent'},
  { id: "3", name: "HIGH",color:'error' },
];

export const findPriority = (id:string)=>{
  const priority = Priorities?.find((item)=>item.id === id) 
  return priority
}