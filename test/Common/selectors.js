
// ["Selector", "SelectorType e.g. id xpath class css", "description"]


exports.applicationTrackerSelectors = {
    usernameInput: ["//input[@name='identifier']", "xpath", "The input box for username"],
    passwordInput: ["//input[@type='password' and @name='password']", "xpath", "The input box for password"],
    signinButton: ["//button[text()='Sign In']", "xpath", "The signin button"],
    filter: ["//input[@placeholder='Filter by company']","xpath","the filter by company option"],
    status: [".flex-1.text-inherit.font-normal.px-2","css","status icon in application table"],
    incorrectPWmessage: ["span[id='radix-:r2:'][data-error-code='form_password_incorrect']","css","incorrect password message"],
    signinIdentifier: ["//a[@class='text-gray-700 hover:bg-sky-500 hover:text-white group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6']", "xpath", "The home icon"],
    newApplicationButton:["a[href='/applications/new']","css","new application button"],
    applicationNav: ["//a[contains(@class, 'text-gray-700') and contains(@class, 'hover:bg-sky-500') and contains(@class, 'hover:text-white') and @href='/applications']","xpath","the button in the navigation menu which navigates to applications"],
};

