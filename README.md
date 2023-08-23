The goal of this PCF is to make a HTTP Request to an endpoint, it will display the response (JSON format) in a hierarchical/tree view.
I assume that you have the Microsoft Power Platform CLI installed in your machine. If not, please download it and install it before continue. Same for node.js
Just in case here are the links:

Power Platform CLI: https://aka.ms/PowerAppsCLI
Node.js: https://nodejs.org/es/download/

After you have installed Power Platform CLI and Node.js, open the Developer Command Prompt for Visual Studio. This is the tool which you will be using for most of our operations except some Editor tools to make changes to our code. First step is to create a folder where all our component related files and folders will be present. 

1)	Manually create a folder
2)	Using the developer command prompt for visual studio apply the command: cd <folder path>

The above command will take you to the folder create in the step 1. Next step is to create a new component project by passing the basic parameters using the below command. Component type parameter can be either field or dataset. Out of the two only field is available for canvas apps while both are available for model-driven apps.

3)	pac pcf init --namespace <specify your namespace here> --name <name of the component> --template <component type>
    a.	Example: pac pcf init --namespace PCFFileUploader --name PCFFileUploader --template field

Once the project is created, you have to bring in all the required project dependencies. For which you have to run the command as below

4)	npm install

Then in order to complete the configuration of the PCF run the following commands

5)	npm install
6)	npm install react@17
7)	npm install @types/react@17
8)	npm install react-dom@17 or npm install react-dom@17 --legacy-peer-deps
9)	npm install @types/react-dom@17
10)	npm install react-modal
11)	npm i --save-dev @types/react-modal
12)	npm install @fluentui/react

Next step is where you will define how our component will work and what functionality it will achieve. So to do that you have to open the folder in any IDE/text editor of your choice. I personally prefer VS Code.

13)	Copy the code from the index.ts file to your index.ts file
14)	Do the same for the others ts and tsx files
15)	Copy the ControlManifest xml file
16)	Copy the css folder and css file
17)	Copy the tsconfig file
18)	Check if the errors in the index.ts and the rest of the files are gone, if the only error is the fetchUrl input property, then run the following command: 
    npm run build

After running this command, that error will disappear.
Assuming that up to this step we are good and no errors for us, then the next step is to deploy the PCF so that it can be used in your Dataverse environment.
To do that you have to sign in to your Dataverse environment to do that you have to run the following commands:

19)	Pac auth list
20)	If you already created the login to your Dataverse environment then you need to run this command:
    Pac auth select --index <index of the list where it’s the Dataverse environment>
    Else you have to run this command:
    pac auth create --url <https://myorg.crm.dynamics.com>
   	
22)	Pac pcf push –publisher-prefix <publisher of your solution>
    Example: pac pcf push --publisher-prefix p3i

Until here the PCF is already published in the environment. Now you have to have an endpoint to make a HTTP Request, because in the end the PCF is making a HTTP request to an endpoint.
Here you can create a Cloud flow with HTTP trigger so you can test it.
A small and quick example could be a Cloud flow like the following:

![image](https://github.com/walcivar/JsonTreeViewer/assets/5630463/e15e7942-124c-4694-87b7-c09428036755)

The Compose action contains the following JSON example:
[
  {
    "name": "Level 1 - Node 1",
    "id": "1",
    "type": "A",
    "description": "Description for Level 1 - Node 1",
    "children": [
      {
        "name": "Level 2 - Node 1",
        "id": "2",
        "type": "B",
        "description": "Description for Level 2 - Node 1",
        "children": [
          {
            "name": "Level 3 - Node 1",
            "id": "3",
            "type": "C",
            "description": "Description for Level 3 - Node 1",
            "children": [
              {
                "name": "Level 4 - Node 1",
                "id": "4",
                "type": "D",
                "description": "Description for Level 4 - Node 1",
                "children": [
                  {
                    "name": "Level 5 - Node 1",
                    "id": "5",
                    "type": "E",
                    "description": "Description for Level 5 - Node 1"
                  },
                  {
                    "name": "Level 5 - Node 2",
                    "id": "6",
                    "type": "E",
                    "description": "Description for Level 5 - Node 2"
                  },
                  {
                    "name": "Level 5 - Node 3",
                    "id": "7",
                    "type": "E",
                    "description": "Description for Level 5 - Node 3"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
]
Here is worth mentioning that the JSON structure it’s really important because the structure it’s defined in the types.ts file.
So in my case I’ve worked with a JSON that has 4 properties on each node/level and a fifth property which is an array of children nodes, this array is called “children”.
If you have a different JSON structure then you will need to update the types.ts file.
Finally you have to add the component to a text column in the desired form:

![image](https://github.com/walcivar/JsonTreeViewer/assets/5630463/2fde1b74-2110-4d81-b8c0-267d94c2cf8f)

And you have to configure the fetchUrl input property, here you have to set the endpoint URL, which in your case will be the Cloud flow URL.
Save and publish and you are ready to test it.

![image](https://github.com/walcivar/JsonTreeViewer/assets/5630463/e75eb3ff-248e-4d17-8dce-255c59ea9617)

![image](https://github.com/walcivar/JsonTreeViewer/assets/5630463/ad160373-91f2-47c6-9df0-dec7d4699290)

![image](https://github.com/walcivar/JsonTreeViewer/assets/5630463/a88a4235-25b8-4b77-9d89-e247199051f6)
