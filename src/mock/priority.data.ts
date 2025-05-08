export const Priorities = [
  { id: "1", name: "LOW" },
  { id: "2", name: "MEDIUM" },
  { id: "3", name: "HIGH" },
];

export const findPriority = (id:string)=>{
  const priority = Priorities?.find((item)=>item.id === id) 
  return priority
}