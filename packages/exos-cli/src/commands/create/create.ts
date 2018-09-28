function validateValues(argv) {
  const valuesWithErrors = [];
  if (!argv.type) {
    valuesWithErrors.push("type");
  }

  if (!argv.name) {
    valuesWithErrors.push("name");
  }

  if (!valuesWithErrors.length) {
    return true;
  }

  console.error(`Missing required arguments: ${valuesWithErrors.join(", ")}`);
  return false;
}

function create(argv) {
  if (!validateValues(argv)) {
    return;
  }

  console.log("create command called with arguments", argv);
}

export default create;
