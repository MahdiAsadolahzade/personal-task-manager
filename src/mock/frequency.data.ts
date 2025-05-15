type TFrequeny = {
    id: string;
    name: string;
};

export const Frequencies: TFrequeny[] = [
    { id: '1', name: 'daily' },
    { id: '2', name: 'weekly' },
    { id: '3', name: 'monthly' },
    { id: '4', name: 'yearly' },
];

export const findFrequency = (id: string) => {
    const frequency = Frequencies?.find((item) => item.id === id);
    return frequency;
};
