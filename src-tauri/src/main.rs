// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::api::path::home_dir;

const MAIN_DIR_NAME: &str = "noter";

fn read_directory(path: String) -> Result<Vec<String>, String> {
    let mut files: Vec<String> = Vec::new();
    match std::fs::read_dir(path) {
        Ok(entries) => {
            for entry in entries {
                match entry {
                    Ok(entry) => {
                        let file_name = entry.file_name();
                        // ignore if extension not md
                        if file_name.to_str().unwrap().split('.').last().unwrap() != "md" {
                            continue;
                        }
                        let path_str = file_name.to_str().unwrap().to_string();
                        files.push(path_str);
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
fn read_main_directory() -> Result<Vec<String>, String> {
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
        .invoke_handler(tauri::generate_handler![read_main_directory])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
