export const recurrencePattern = [
    { id: '1', name: 'Daily' },
    { id: '2', name: 'Weekly' },
    { id: '3', name: 'Monthly' },
    { id: '4', name: 'Yearly' },
    { id: '5', name: 'Bi-Weekly' },
    { id: '6', name: 'Quarterly' },
    { id: '7', name: 'Semi-Annually' },
];

export const findRecurrencePattern = (id:string)=>{
  const pattern = recurrencePattern?.find((item)=>item.id === id) 
  return pattern
}