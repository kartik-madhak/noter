// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::api::path::home_dir;

const MAIN_DIR_NAME: &str = "noter";

fn read_directory(path: String) -> Result<Vec<(String, String)>, String> {
    let mut files: Vec<(String, String)> = Vec::new();
    match std::fs::read_dir(path) {
        Ok(entries) => {
            for entry in entries {
                match entry {
                    Ok(entry) => {
                        let file_name = entry.file_name();
                        if file_name.to_str().unwrap().split('.').last().unwrap() != "md" {
                            continue;
                        }
                        let path_str = entry.path().to_str().unwrap().to_string();
                        let name_str = file_name.to_str().unwrap().to_string();
                        files.push((name_str, path_str));
                    }
                    Err(e) => {
                        return Err(format!("Error reading directory: {}", e));
                    }
                }
            }
        }
        Err(e) => {
            return Err(format!("Error reading directory: {}", e));
        }
    }
    Ok(files)
}

#[tauri::command]
fn read_file(path: String) -> Result<String, String> {
    println!("Reading file: {}", path);
    if path.is_empty() {
        return Ok("".to_string());
    }
    match std::fs::read_to_string(path) {
        Ok(content) => Ok(content),
        Err(e) => Err(format!("Error reading file: {}", e)),
    }
}

#[tauri::command]
fn read_main_directory() -> Result<Vec<(String, String)>, String> {
    let path = home_dir().unwrap().join(MAIN_DIR_NAME);
    read_directory(path.to_str().unwrap().to_string())
}

fn init() {
    let path = home_dir().unwrap().join(MAIN_DIR_NAME);
    if !path.exists() {
        std::fs::create_dir(path).unwrap();
    }
}

fn main() {
    tauri::Builder::default()
        .setup(|_app| {
            init();
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![read_main_directory, read_file])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
