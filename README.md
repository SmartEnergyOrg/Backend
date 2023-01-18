![120393305](https://user-images.githubusercontent.com/38434237/212727884-4746ef79-9726-4618-8a16-37bde6750281.png)
# Smart Energy - Status Monitor

[project description here]

## Environment setup

Add all variables from sample.env to your own custom .env file.

## Docker setup

If you are on windows 10/11 Home:

1. Install WSL: [WSL installation guide](https://docs.microsoft.com/en-us/windows/wsl/install)
2. Restart your computer, and run in powershell:

```
WSL -l
```

3. If you receive any errors, troubleshoot.
4. If Windows did not install a default distro (Ubuntu) Install one from the MS
   store: [Ubuntu from MS store](https://apps.microsoft.com/store/detail/ubuntu/9PDXGNCFSCZV?hl=en-us&gl=US)
5. For a more comfortable working environment get Windows Terminal and set Ubuntu as your default
   CLI: [Windows Terminal from MS store](https://apps.microsoft.com/store/detail/windows-terminal/9N0DX20HK701)
6. Install Docker: [Docker](https://www.docker.com/)
7. Restart computer
8. Open Docker-Desktop, open settings and go to: `Resources > WSL Integration` Enable Ubuntu and press refresh
9. Open Windows Terminal or Ubuntu and see if the `docker` command is working.

If you are on Linux, Mac or Windows 10/11 Pro:

1. Install Docker
2. Run `docker` in a CLI to see if it works

### When Docker is installed:

1. navigate to the repo in a terminal or inside your IDE's CLI
2. copy and paste `sample.env` (to keep it on the repo) and rename it to `.env`
3. edit the `.env` file so that it contains your preferred values
4. run `docker-compose build`
5. run `docker-compose up -d` to run the containers in the background
6. run `docker-compose down` to stop and remove the containers

### Using remote containers with VSCode

For an optimal dev environment use the remote containers extension

1. Open VSCode in this project
2. Install Remote - Containers from Microsoft (ms-vscode-remote.remote-containers)
3. Copy and paste `sample.env` (to keep it on the repo) and rename it to `.env`
4. Open the command pallet `ctrl` + `shift` + `p` and run `> Remote Containers: Open Folder in container..`
5. You should now be inside the container within VSCode.

# Contribution rules

## Code conventions

- Strict convention rules are not applied in any frontend Projects. Most components and boilerplate will be generated
  already.
- No unused variables
- Always make use of semicolons (;) at the end of a statement.
- Use double quotes.
- All functions must have a JSDoc comment.

```TS
   /**
    * I am a JSDoc, I describe the function below me.
    * This function calls someone SUS!
    * @param person - The person who's gonna be sus.
    */
  function amongUs(person: any): void {
    console.log(`${person} is sus`);
  }
```

- No unused functions
- When you use an ESLint Ignore statement add an explanation.

### What happens when code is committed that does not follow the code conventions?

When code is committed that contains linting errors it will fail whilst running in the pipeline.
Your pull request will fail and can therefor not be pr'd back to dev or main.

## Git and Github rules

- Do not push directly to Dev or Main.
- Use Milestones for user stories.
- Use an issue per problem you'll tackle.
- Add corresponding Milestones (user stories) to your issue.
- Add fitting labels to your issue (bugfix, new feature, documentation etc.)
- For every new problem you'll solve you work on a different feature or bug-fix branch. (feature/stream-window,
  bug-fix/centered-div)
- When done with a branch create a pull request with your pushed branch.
- in the description write: Closes #Issue number of issue you've solved. This way Issues will automatically be closed
  after the pull request has been submitted.
- Every pull request needs at least one code review.
- Only use `feature` and `bug-fix` branches.
- Do your code reviews seriously.
- Do not review/submit pull requests that are still running CI tests.
- Assign yourself and other people if necessary to the assignee's tab in a pull request.
- Feel free to request reviewers in a pull request.
- Make sure not to commit big chunks of changes, commit in small steps.

# Smart Energie dankwoord.
In dit document zal een korte achtergrond van het project uitgelegd worden. Ook zal namens het projetgroep een dankwoord geuit worden aan alle betrokken partijen.

## Handleiding API
Via de link hieronder, zal er verwezen worden naar de installatiehandleiding van de API:

[Handleiding API](https://github.com/SmartEnergyOrg/Backend/blob/feature-documentation/MANUAL.md)


## Achtergrond
Een belangrijke reden voor de ontwikkeling van dit systeem, is dat er een energietransitie van fossiele brandstof naar duurzame energie plaatsvind. Eén voorbeeld van duurzame energie is via zonne-energie via zonnepanelen.
Het gevolg hiervan is dat een gebruiker energie ontvangt van meerdere bronnen. Dit systeem is bedoeld om deze energietransitie te ondersteunen.

### Dankwoord
Namens het projectgroep, willen we onze contactpersoon Arno Broeders bedanken voor onze samenwerking tijdens het project. Ook willen onze begeleiders Remo van der Heijden en Jan Montizaan bedanken bij het ondersteunen van het ontwikkelingsproces.

## Betrokken partijen
Hierin worden betrokken partijen op een rij gezet en geven alle personen aan die bij het project betrokken waren.

### Ontwikkelaars
Studenten
|Xin|Silvester|Marcello|Jens|Mick|Joost|
|----|----|----|----|----|----|

### Projectbegeleiders
|Remo van der Heijden|Jan Montizaan|
|----|----|

### Contactpersoon
|Arno Broeders|
|----|
