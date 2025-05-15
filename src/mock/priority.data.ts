export const Priorities = [
  { id: "1", name: "LOW" ,color:'primary' ,icon:'/icons/low.svg' },
  { id: "2", name: "MEDIUM" ,color:'accent' ,icon:'/icons/medium.svg'},
  { id: "3", name: "HIGH",color:'error' ,icon:'/icons/high.svg'},
];

export const findPriority = (id:string)=>{
  const priority = Priorities?.find((item)=>item.id === id) 
  return priority
}