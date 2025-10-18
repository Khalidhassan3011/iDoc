export const codeTemplates: Record<string, string> = {
  cpp: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

int main() {
    // Write your code here
    cout << "Hello, World!" << endl;

    return 0;
}`,

  python: `def main():
    # Write your code here
    print("Hello, World!")

if __name__ == "__main__":
    main()`,

  javascript: `function main() {
    // Write your code here
    console.log("Hello, World!");
}

main();`,
};

/**
 * Get code template for a specific language
 */
export function getCodeTemplate(language: string): string {
  return codeTemplates[language] || codeTemplates.javascript;
}

/**
 * Get all supported languages
 */
export function getSupportedLanguages() {
  return [
    { value: 'cpp', label: 'C++', icon: '⚙️' },
    { value: 'python', label: 'Python', icon: '🐍' },
    { value: 'javascript', label: 'JavaScript', icon: '🟨' },
  ];
}
