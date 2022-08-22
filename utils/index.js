const filterProperties = (raw, unallowed) => {
  return (
    Object.keys(raw)
      .filter((key) => !unallowed.includes(key))
      // eslint-disable-next-line unicorn/prefer-object-from-entries
      .reduce((object, key) => {
        object[key] = raw[key]
        return object
      }, {})
  )
}

export default filterProperties
