
export const createItem = async (data: any)=> {
    const response = await fetch(`/api/createInsuranceItem`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({data})
    })
    return await response.json();
}
export const updateItem = async (data: any)=> {
    const response = await fetch('/api/insuranceItem/update', {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({data})
    })
    return await response.json();
}