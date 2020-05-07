/**
 * Lazy load enzyme adapter.
 */

const enzyme = require("enzyme/build");

jest.mock("enzyme", () => enzyme);

const Adapter = require("enzyme-adapter-react-16");
enzyme.configure({ adapter: new Adapter() });

jest.unmock("enzyme");

module.exports = enzyme;
