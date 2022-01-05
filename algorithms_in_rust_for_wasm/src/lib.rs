use wasm_bindgen::prelude::*;

extern crate serde;
extern crate serde_json;
use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize)]
pub struct Arr {
    pub nums: Vec<i32>,
}

/*
#[wasm_bindgen]
pub fn bubblesort(arr: &mut [i32]) {
    for i in 0..arr.len() {
        for j in 0..arr.len() - i - 1 {
            if arr[j] > arr[j + 1] {
                arr.swap(j, j + 1)
            }
        }
    }
}*/


#[wasm_bindgen]
pub fn bubble_sort(arr: String) -> String {
    let mut arr: Arr = serde_json::from_str(&arr).unwrap();
    for i in 0..arr.nums.len() {
        for j in 0..arr.nums.len() - i - 1 {
            if arr.nums[j] > arr.nums[j + 1] {
                arr.nums.swap(j, j + 1);
            }
        }
    }
    serde_json::to_string(&arr.nums).unwrap()
}