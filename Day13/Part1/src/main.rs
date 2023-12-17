use std::fs;

fn main() {
    let path = "./input.txt";
    let input = fs::read_to_string(path)
        .expect("Something went wrong reading the file");
    let sections: Vec<&str> = input.split("\n\n").collect();

    let mut sum: u32 = 0;

    for (i, section) in sections.iter().enumerate() {
        println!("Section {}:", i + 1);

        let rows: Vec<&str> = section.lines().collect();
        let transposed_columns: Vec<String> = transpose_grid(&rows);
        // Convert Vec<String> to Vec<&str>
        let transposed_columns_slices: Vec<&str> = transposed_columns.iter().map(|s| s.as_str()).collect();

        // Pass memory reference to the lines vector
        let horizontal_reflection_line = find_horizontal_reflection(&rows);
        let vertical_reflection_line = find_horizontal_reflection(&transposed_columns_slices);

        if horizontal_reflection_line.is_some() {
            println!("Horizontal reflection line found at index {}", horizontal_reflection_line.unwrap());
            sum += horizontal_reflection_line.unwrap() as u32 * 100;
        } else if vertical_reflection_line.is_some() {
            println!("Vertical reflection line found at index {}", vertical_reflection_line.unwrap());
            sum += vertical_reflection_line.unwrap() as u32
        }

        println!("{}", sum)
    }
}

fn find_horizontal_reflection(rows: &Vec<&str>) -> Option<usize> {
    let mut last_line = String::new();

    // Find horizontal reflection
    for (j, line) in rows.iter().enumerate() {
        if line == &last_line {
            let mut pre_reflection_index: u32 = (j - 1) as u32;
            let mut post_reflection_index: u32 = j as u32;

            let mut reflection_found = true;

            // Compare lines on both sides of the reflection line
            while pre_reflection_index >= 0 && post_reflection_index < rows.len() as u32 {
                if rows[pre_reflection_index as usize] != rows[post_reflection_index as usize] {
                    reflection_found = false;
                    break;
                }
                if pre_reflection_index == 0 {
                    break;
                }
                pre_reflection_index -= 1;
                post_reflection_index += 1;
            }

            if reflection_found {
                // j is the index, so to get the row number, add 1
                println!("Horizontal reflection found between rows {} and {}", j, j+1);
                return Some(j);
            } else {
                println!("No horizontal reflection found");
            }
        }

        last_line = line.to_string();
    }

    // Return None if no reflection is found
    None
}

fn transpose_grid(grid: &Vec<&str>) -> Vec<String> {
    let row_count = grid.len();
    let col_count = grid[0].len();
    let mut transposed_grid = vec![String::new(); col_count];

    for i in 0..col_count {
        for j in 0..row_count {
            transposed_grid[i].push(grid[j].chars().nth(i).unwrap());
        }
    }

    transposed_grid
}