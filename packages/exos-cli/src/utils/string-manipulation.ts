function toCamelCase(str: string): string {
  return (
    str
      .toLowerCase()
      // Replaces any - or _ characters with a space
      .replace(/[-_]+/g, " ")
      // Uppercases the first character in each group immediately following a space
      .replace(/ (.)/g, (firstCharacter) => firstCharacter.toUpperCase())
      // Removes spaces
      .replace(/ /g, "")
  );
}

function toPascalCase(str: string): string {
  const camelizedString = toCamelCase(str);

  // If it has at least a character, return the first caracter in uppercase
  // and the rest as is (i.e. in camelcase)
  if (camelizedString.length > 0) {
    return camelizedString[0].toUpperCase() + camelizedString.substring(1);
  }

  return camelizedString;
}

export { toCamelCase, toPascalCase };
