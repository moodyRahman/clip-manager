const handleChange = (setter) => {
    return (e) => {
        setter(e.target.value)
    }
}

export { handleChange }