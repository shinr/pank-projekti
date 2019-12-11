export const allowAll = () => true

export const filters =
{
    matchPropertyArray: (property, value) => e => e.hasOwnProperty(property) ? (Array.isArray(e[property]) ? e[property].includes(value) : false) : false,
    matchProperty: (property, value) => (e) => e.hasOwnProperty(property) ? e[property] === value : false,
    allowAll: () => allowAll
}

export default filters