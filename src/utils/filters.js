export const allowAll = () => true

export const filters =
{
    matchProperty: (property, value) => (e) => e.hasOwnProperty(property) ? e[property] === value : false,
    allowAll: () => allowAll
}

export default filters