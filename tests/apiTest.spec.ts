import { test, expect, APIRequestContext } from '@playwright/test';

let userid: string;

test("Get users", async ({request}:{request: APIRequestContext }) => {
    try{
    const response = await request.get('https://reqres.in/api/users?page=2')
    console.log(await response.json())
    expect(response.status()).toBe(200)
    }
    catch (error: unknown) {
        console.error('Error during GET request:', (error as Error).message);
        throw error; // Re-throw the error so Playwright will mark the test as failed
    }
})

test("Create users", async ({request}: {request: APIRequestContext }) => {
    try{
    const response = await request.post('https://reqres.in/api/users',{
        data:{"name":"kumari","job":"taining" },
        headers :{"Accept":"application/json"}
    });
    console.log(await response.json())
    expect(response.status()).toBe(201)
    var res = await response.json()
    userid = res.id
}
catch (error: unknown) {
    console.error('Error during POST request:', (error as Error).message);
    throw error;
}
    
});


test("Update users", async ({request}: {request: APIRequestContext }) => {
    if (!userid) {
        console.error('User ID not found. Skipping update request.');
        return;
    }
    try{
    const response = await request.put('https://reqres.in/api/users/'+userid,{
        data:{"name":"kumari_update","job":"taining_update" },
        headers :{"Accept":"application/json"}
    });
    console.log(await response.json())
    expect(response.status()).toBe(200)
}
catch (error: unknown) {
    console.error('Error during PUT request:', (error as Error).message);
    throw error;
}
    
});


test("Delete users", async ({request}: {request: APIRequestContext }) => {
    if (!userid) {
        console.error('User ID not found. Skipping delete request.');
        return;
    }
    try{
    const response = await request.delete('https://reqres.in/api/users/'+userid)
    expect(response.status()).toBe(204)
    }
    catch (error) {
        console.error('Error during DELETE request:', (error as Error).message);
        throw error;
    }
});