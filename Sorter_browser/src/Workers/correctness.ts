export function isCorrect(arr: number[]): boolean {
    if(arr.length < 1)
        console.log("isCorrect was asked to check an empty array!");
    for(let i = 0; i < arr.length - 1; i++) {
        if(arr[i] > arr[i+1])
            return false;
    }
    return true;
}