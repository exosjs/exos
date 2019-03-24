function toCamelCase(str: string) {
  return (
    str
      .toLowerCase()
      // Replaces any - or _ characters with a space
      .replace(/[-_]+/g, " ")
      // Uppercases the first character in each group immediately following a space
      .replace(/ (.)/g, firstCharacter => firstCharacter.toUpperCase())
      // Removes spaces
      .replace(/ /g, "")
  );
}

function toPascalCase(str: string) {
  const camelizedString = toCamelCase(str);

  if (camelizedString[0].length) {
    return camelizedString[0].toUpperCase() + camelizedString[0].substring(1);
  }

  return camelizedString;
}

export { toCamelCase, toPascalCase };
