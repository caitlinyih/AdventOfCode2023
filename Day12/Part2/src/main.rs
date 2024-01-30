use std::fs;
use rayon::prelude::*;
use std::time::Instant;

fn main() {
    let start = Instant::now();

    let path = "./input.txt";
    let input = fs::read_to_string(path)
        .expect("Something went wrong reading the file");

    let lines: Vec<&str> = input.split("\n").collect();

    let total: usize = lines.par_iter().map(|line| {
        let parts: Vec<&str> = line.splitn(2, ' ').collect();

        let input_string: &str = parts[0];
        let input_chars: Vec<char> = input_string.chars().collect();

        let trimmed_input_chars: Vec<char> = trim_dots(&input_chars);
        let collapsed_input_chars: Vec<char> = collapse_dots(&trimmed_input_chars);

        let hash_group_vector: Vec<usize> = parts[1]
            .split(',')
            .filter_map(|s| s.parse().ok())
            .collect();

        rec(&collapsed_input_chars, &hash_group_vector, 0, 0)
    }).sum();

    println!("Total: {total}");
    println!("Took {:?}", start.elapsed());
}

fn trim_dots(chars: &[char]) -> Vec<char> {
    let mut trimmed: Vec<char> = chars
        .iter()
        .skip_while(|&&c| c == '.')
        .cloned()
        .collect();

    while trimmed.last() == Some(&'.') {
        trimmed.pop();
    }

    trimmed
}

fn collapse_dots(chars: &[char]) -> Vec<char> {
    let mut result = Vec::new();

    let mut previous_was_dot = false;
    for &c in chars {
        if c == '.' {
            if !previous_was_dot {
                result.push(c);
                previous_was_dot = true;
            }
        } else {
            result.push(c);
            previous_was_dot = false;
        }
    }

    result
}

fn rec(chars: &[char], hash_groups: &[usize], char_index: usize, hash_group_index: usize) -> usize {
    // exit case
    if char_index == chars.len() {
        return if hash_groups == get_hash_groups(&chars) {
            1
        } else {
            0
        };
    }

    let current_char: char = chars[char_index];
    let mut sum = 0;

    match current_char {
        '?' => {
            // '#'
            let hash: Vec<char> = copy_and_modify(chars, char_index, '#');
            sum += rec(&hash, hash_groups, char_index, hash_group_index);

            // '.'
            let dot: Vec<char> = copy_and_modify(chars, char_index, '.');
            sum += rec(&dot, hash_groups, char_index, hash_group_index);
        }
        '#' => {
            if count_hashes(&chars, char_index) <= hash_groups[hash_group_index] {
                sum += rec(&chars, hash_groups, char_index + 1, hash_group_index);
            }
        }
        '.' => {
            if char_index == 0 || is_preceding_char_dot(&chars, char_index) {
                sum += rec(&chars, hash_groups, char_index + 1, hash_group_index);
            }
            else if count_hashes_behind(&chars, char_index) == hash_groups[hash_group_index] {
                if hash_group_index == hash_groups.len() - 1 {
                    sum += rec(&chars, hash_groups, char_index + 1, hash_group_index);
                } else {
                    sum += rec(&chars, hash_groups, char_index + 1, hash_group_index + 1);
                }
            }
        }
        _ => {}
    }

    sum
}

fn copy_and_modify(chars: &[char], index: usize, new_value: char) -> Vec<char> {
    let mut new_chars = chars.to_vec();

    if index < new_chars.len() {
        new_chars[index] = new_value;
    }

    new_chars
}

fn count_hashes(chars: &[char], index: usize) -> usize {
    if index >= chars.len() {
        return 0;
    }

    let mut count = 0;
    let mut i = index;

    while i < chars.len() && chars[i] == '#' {
        count += 1;
        if i == 0 {
            break;
        }
        i -= 1;
    }

    count
}

fn count_hashes_behind(chars: &[char], index: usize) -> usize {
    if index == 0 || index > chars.len() {
        return 0;
    }

    let mut count = 0;
    let mut i = index - 1;

    while i < chars.len() && chars[i] == '#' {
        count += 1;
        if i == 0 {
            break;
        }
        i -= 1;
    }

    count
}

fn is_preceding_char_dot(chars: &[char], index: usize) -> bool {
    if index > 0 && index <= chars.len() {
        chars[index - 1] == '.'
    } else {
        false
    }
}

fn get_hash_groups(chars: &[char]) -> Vec<usize> {
    let mut hash_groups = Vec::new();
    let mut hash_streak = 0;

    for char in chars {
        if *char == '#' {
            hash_streak += 1;
        } else {
            if hash_streak != 0 {
                hash_groups.push(hash_streak);
                hash_streak = 0;
            }
        }
    }

    if hash_streak != 0 {
        hash_groups.push(hash_streak);
    }

    hash_groups
}