// Static list of problems - no server-side dependencies
export interface Problem {
  id: string;
  title: string;
  slug: string;
  url: string;
}

// Manually curated list of Top 100 problems
export function getAllProblems(): Problem[] {
  const problems: Problem[] = [
    { id: '1', title: '1. Swap Two Numbers', slug: '1-swap-two-numbers', url: '/docs/problem-solving/top-100/1-swap-two-numbers' },
    { id: '2', title: '2. Sort Array Without Sort', slug: '2-sort-array-without-sort', url: '/docs/problem-solving/top-100/2-sort-array-without-sort' },
    { id: '3', title: '3. Second Largest Number', slug: '3-second-largest-number', url: '/docs/problem-solving/top-100/3-second-largest-number' },
    { id: '4', title: '4. Generate 50 Primes', slug: '4-generate-50-primes', url: '/docs/problem-solving/top-100/4-generate-50-primes' },
    { id: '5', title: '5. Reverse String Without Loop', slug: '5-reverse-string-without-loop', url: '/docs/problem-solving/top-100/5-reverse-string-without-loop' },
    { id: '6', title: '6. Matrix Addition', slug: '6-matrix-addition', url: '/docs/problem-solving/top-100/6-matrix-addition' },
    { id: '7', title: '7. Count Character Occurrences', slug: '7-count-character-occurrences', url: '/docs/problem-solving/top-100/7-count-character-occurrences' },
    { id: '8', title: '8. Number to Words', slug: '8-number-to-words', url: '/docs/problem-solving/top-100/8-number-to-words' },
    { id: '9', title: '9. Matching Characters', slug: '9-matching-characters', url: '/docs/problem-solving/top-100/9-matching-characters' },
    { id: '10', title: '10. Count Vowels and Consonants', slug: '10-count-vowels-consonants', url: '/docs/problem-solving/top-100/10-count-vowels-consonants' },
    { id: '11', title: '11. Factors of Number', slug: '11-factors-of-number', url: '/docs/problem-solving/top-100/11-factors-of-number' },
    { id: '12', title: '12. First Ten Fibonacci', slug: '12-first-ten-fibonacci', url: '/docs/problem-solving/top-100/12-first-ten-fibonacci' },
    { id: '13', title: '13. Third Node in Linked List', slug: '13-third-node-linked-list', url: '/docs/problem-solving/top-100/13-third-node-linked-list' },
    { id: '14', title: '14. Search in Linked List', slug: '14-search-linked-list', url: '/docs/problem-solving/top-100/14-search-linked-list' },
    { id: '15', title: '15. Remove Special Characters', slug: '15-remove-special-characters', url: '/docs/problem-solving/top-100/15-remove-special-characters' },
    { id: '16', title: '16. Missing and Repeating Numbers', slug: '16-missing-repeating-numbers', url: '/docs/problem-solving/top-100/16-missing-repeating-numbers' },
    { id: '17', title: '17. String Permutations', slug: '17-string-permutations', url: '/docs/problem-solving/top-100/17-string-permutations' },
    { id: '18', title: '18. Palindrome Number', slug: '18-palindrome-number', url: '/docs/problem-solving/top-100/18-palindrome-number' },
    { id: '19', title: '19. Array Average', slug: '19-array-average', url: '/docs/problem-solving/top-100/19-array-average' },
    { id: '20', title: '20. Sudoku Solver', slug: '20-sudoku-solver', url: '/docs/problem-solving/top-100/20-sudoku-solver' },
    { id: '21', title: '21. Leap Year', slug: '21-leap-year', url: '/docs/problem-solving/top-100/21-leap-year' },
    { id: '22', title: '22. Narcissistic Number', slug: '22-narcissistic-number', url: '/docs/problem-solving/top-100/22-narcissistic-number' },
    { id: '23', title: '23. Unique Random Shuffle', slug: '23-unique-random-shuffle', url: '/docs/problem-solving/top-100/23-unique-random-shuffle' },
    { id: '24', title: '24. Binary Search', slug: '24-binary-search', url: '/docs/problem-solving/top-100/24-binary-search' },
    { id: '25', title: '25. Sum Natural Numbers Without Loop', slug: '25-sum-natural-no-loop', url: '/docs/problem-solving/top-100/25-sum-natural-no-loop' },
    { id: '26', title: '26. Nearest Smaller to the Left', slug: '26-nearest-smaller-left', url: '/docs/problem-solving/top-100/26-nearest-smaller-left' },
    { id: '27', title: '27. Minimum Coins', slug: '27-minimum-coins', url: '/docs/problem-solving/top-100/27-minimum-coins' },
    { id: '28', title: '28. Two Sum', slug: '28-two-sum', url: '/docs/problem-solving/top-100/28-two-sum' },
    { id: '29', title: '29. Remove Duplicates from Array', slug: '29-remove-duplicates-array', url: '/docs/problem-solving/top-100/29-remove-duplicates-array' },
    { id: '30', title: '30. Search in Rotated Array', slug: '30-search-rotated-array', url: '/docs/problem-solving/top-100/30-search-rotated-array' },
    { id: '31', title: '31. Find Missing Number', slug: '31-find-missing-number', url: '/docs/problem-solving/top-100/31-find-missing-number' },
    { id: '32', title: '32. Find Duplicate Number', slug: '32-find-duplicate-number', url: '/docs/problem-solving/top-100/32-find-duplicate-number' },
    { id: '33', title: '33. Largest and Smallest in Array', slug: '33-largest-smallest-array', url: '/docs/problem-solving/top-100/33-largest-smallest-array' },
    { id: '34', title: '34. All Pairs with Given Sum', slug: '34-all-pairs-given-sum', url: '/docs/problem-solving/top-100/34-all-pairs-given-sum' },
    { id: '35', title: '35. Remove Duplicates in Place', slug: '35-remove-duplicates-in-place', url: '/docs/problem-solving/top-100/35-remove-duplicates-in-place' },
    { id: '36', title: '36. Rotate Array Left/Right', slug: '36-rotate-array-left-right', url: '/docs/problem-solving/top-100/36-rotate-array-left-right' },
    { id: '37', title: '37. Find Duplicates in Unsorted Array', slug: '37-find-duplicates-unsorted', url: '/docs/problem-solving/top-100/37-find-duplicates-unsorted' },
    { id: '38', title: '38. Find Position in Sorted Array', slug: '38-find-position-sorted-array', url: '/docs/problem-solving/top-100/38-find-position-sorted-array' },
    { id: '39', title: '39. Longest Consecutive Sequence', slug: '39-longest-consecutive-sequence', url: '/docs/problem-solving/top-100/39-longest-consecutive-sequence' },
    { id: '40', title: '40. QuickSort In-Place', slug: '40-quicksort-in-place', url: '/docs/problem-solving/top-100/40-quicksort-in-place' },
    { id: '41', title: '41. Maximum Subarray Sum', slug: '41-maximum-subarray-sum', url: '/docs/problem-solving/top-100/41-maximum-subarray-sum' },
    { id: '42', title: '42. Reverse Array In-Place', slug: '42-reverse-array-in-place', url: '/docs/problem-solving/top-100/42-reverse-array-in-place' },
    { id: '43', title: '43. Remove Duplicates Without Library', slug: '43-remove-duplicates-no-library', url: '/docs/problem-solving/top-100/43-remove-duplicates-no-library' },
    { id: '44', title: '44. Byte Array to String', slug: '44-byte-array-to-string', url: '/docs/problem-solving/top-100/44-byte-array-to-string' },
    { id: '45', title: '45. Array vs Linked List', slug: '45-array-vs-linked-list', url: '/docs/problem-solving/top-100/45-array-vs-linked-list' },
    { id: '46', title: '46. Binary Search in Array', slug: '46-binary-search-array', url: '/docs/problem-solving/top-100/46-binary-search-array' },
    { id: '47', title: '47. Median of Two Sorted Arrays', slug: '47-median-two-sorted-arrays', url: '/docs/problem-solving/top-100/47-median-two-sorted-arrays' },
    { id: '48', title: '48. Find Multiple Duplicates', slug: '48-find-multiple-duplicates', url: '/docs/problem-solving/top-100/48-find-multiple-duplicates' },
    { id: '49', title: '49. Reverse Linked List', slug: '49-reverse-linked-list', url: '/docs/problem-solving/top-100/49-reverse-linked-list' },
    { id: '50', title: '50. Insert in Middle of Linked List', slug: '50-insert-middle-linked-list', url: '/docs/problem-solving/top-100/50-insert-middle-linked-list' },
    { id: '51', title: '51. Intersection of Two Linked Lists', slug: '51-intersection-two-linked-lists', url: '/docs/problem-solving/top-100/51-intersection-two-linked-lists' },
    { id: '52', title: '52. Detect Cycle in Linked List', slug: '52-detect-cycle-linked-list', url: '/docs/problem-solving/top-100/52-detect-cycle-linked-list' },
    { id: '53', title: '53. Merge Sorted Linked Lists', slug: '53-merge-sorted-linked-lists', url: '/docs/problem-solving/top-100/53-merge-sorted-linked-lists' },
    { id: '54', title: '54. Find Middle Element in One Pass', slug: '54-find-middle-one-pass', url: '/docs/problem-solving/top-100/54-find-middle-one-pass' },
    { id: '55', title: '55. Detect Cycle in Linked List', slug: '55-detect-cycle-linked-list', url: '/docs/problem-solving/top-100/55-detect-cycle-linked-list' },
    { id: '56', title: '56. Find Third Node from End', slug: '56-third-node-from-end', url: '/docs/problem-solving/top-100/56-third-node-from-end' },
    { id: '57', title: '57. Sum of Two Linked Lists', slug: '57-sum-two-linked-lists', url: '/docs/problem-solving/top-100/57-sum-two-linked-lists' },
    { id: '58', title: '58. Delete All Occurrences of Key', slug: '58-delete-all-occurrences', url: '/docs/problem-solving/top-100/58-delete-all-occurrences' },
    { id: '59', title: '59. Remove Nth Node from End', slug: '59-remove-nth-from-end', url: '/docs/problem-solving/top-100/59-remove-nth-from-end' },
    { id: '60', title: '60. Merge Two Sorted Lists', slug: '60-merge-two-sorted-lists', url: '/docs/problem-solving/top-100/60-merge-two-sorted-lists' },
    { id: '61', title: '61. Partition List', slug: '61-partition-list', url: '/docs/problem-solving/top-100/61-partition-list' },
    { id: '62', title: '62. Remove Duplicates from Sorted List', slug: '62-remove-duplicates-sorted-list', url: '/docs/problem-solving/top-100/62-remove-duplicates-sorted-list' },
    { id: '63', title: '63. Remove Duplicates from Unsorted List', slug: '63-remove-duplicates-unsorted-list', url: '/docs/problem-solving/top-100/63-remove-duplicates-unsorted-list' },
    { id: '64', title: '64. Find Length of Linked List', slug: '64-find-length-linked-list', url: '/docs/problem-solving/top-100/64-find-length-linked-list' },
  ];

  return problems;
}
