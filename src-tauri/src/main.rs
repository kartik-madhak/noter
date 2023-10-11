// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::collections::HashMap;
use std::{fs, path};

use tauri::api::path::home_dir;

const MAIN_DIR_NAME: &str = "noter";


fn read_directory(path: String) -> Result<Vec<HashMap<String, String>>, String> {
    let mut files: Vec<HashMap<String, String>> = Vec::new();
    match fs::read_dir(path) {
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

                        let mut file_info: HashMap<String, String> = HashMap::new();
                        file_info.insert("name".to_string(), name_str);
                        file_info.insert("path".to_string(), path_str);

                        files.push(file_info);
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
    if path.is_empty() {
        return Ok("".to_string());
    }
    match fs::read_to_string(path) {
        Ok(content) => Ok(content),
        Err(e) => Err(format!("Error reading file: {}", e)),
    }
}

#[tauri::command]
fn read_main_directory() -> Result<Vec<HashMap<String, String>>, String> {
    let path = home_dir().unwrap().join(MAIN_DIR_NAME);
    read_directory(path.to_str().unwrap().to_string())
}

#[tauri::command]
fn save_file(path: String, content: String) -> Result<(), String> {
    match fs::write(path, content) {
        Ok(_) => Ok(()),
        Err(e) => Err(format!("Error saving file: {}", e)),
    }
}

#[tauri::command]
fn new_file(name: String) -> Result<String, String> {
    let mut sanitized_name = sanitize_filename::sanitize(&name);

    if !sanitized_name.ends_with(".md") {
        sanitized_name.push_str(".md");
    }

    let path = home_dir().unwrap().join(MAIN_DIR_NAME).join(sanitized_name);
    let result = Ok(path.to_str().unwrap().to_string());

    if path.exists() {
        return Err(format!("File {} already exists", path.display()));
    }

    match fs::write(path, "") {
        Ok(_) => result,
        Err(e) => Err(format!("Error creating file: {}", e)),
    }
}

#[tauri::command]
fn rename_file(path: String, new_name: String) -> Result<String, String> {
    let old_path = path::Path::new(&path);
    if !old_path.exists() {
        return Err(format!("File {} does not exist", path));
    }

    let mut sanitized_name = sanitize_filename::sanitize(&new_name);

    if !sanitized_name.ends_with(".md") {
        sanitized_name.push_str(".md");
    }

    let new_path = old_path.with_file_name(sanitized_name);
    if new_path.exists() {
        return Err(format!("File {} already exists", new_path.display()));
    }
    fs::rename(&old_path, &new_path).map_err(|err| format!("Failed to rename file: {}", err))?;

    Ok(new_path.to_string_lossy().into_owned())
}

#[tauri::command]
fn delete_file(path: String) -> Result<(), String> {
    let path = path::Path::new(&path);
    if !path.exists() {
        return Err(format!("File {} does not exist", path.display()));
    }

    fs::remove_file(path).map_err(|err| format!("Failed to delete file: {}", err))
}

fn init() {
    let path = home_dir().unwrap().join(MAIN_DIR_NAME);
    if !path.exists() {
        fs::create_dir(path).unwrap();
    }
}

fn main() {
    tauri::Builder::default()
        .setup(|_app| {
            init();
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![read_main_directory, read_file, save_file, new_file, rename_file, delete_file])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
