import fs from 'fs';
import readline from 'readline';
const filePath = 'text.json';

const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
})

const showMenu = () =>{
    console.log('\n1. ADD');
    console.log('2. SHOW TASK');
    console.log('3. EXIT');
    rl.question('Enter your choice:',(condition) =>{
        if (condition === '1') {
            addTask();
          } else if (condition === '2') {
            showTask();
          } else if (condition === '3') {
            console.log("Exiting...");
            rl.close();
          } else {
            console.log("Invalid choice. Please try again.");
            showMenu();
          }
    })
}

const loadTasks = () =>{
    const data = fs.readFileSync(filePath);
    const dataJSON = data.toString();
    return dataJSON? JSON.parse(dataJSON):[];
}

const addTask = () =>{
    rl.question('Add New Task :',(Task) =>{
        const task = loadTasks();
        task.push({Task});
        fs.writeFileSync(filePath,JSON.stringify(task));
        console.log('Task added ',Task)
        showMenu()
    })
   
}

const showTask = () =>{
    console.log('Your Task :')
    const task = loadTasks();
    task.forEach((task,id) => console.log(`${id+1} - ${task.Task}`))
    showMenu()
    
}
showMenu()