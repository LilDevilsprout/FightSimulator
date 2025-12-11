const resetHp = [1, 25, 100, 10]
const txt = document.getElementById('txt');
const errorFight = "Erreur. Aucun combat n'a encore été démarré."
const errorReset = "Erreur. Vous devez appuyer sur RESET pour pouvoir refaire un combat."

let turn = 0
let startFight = false
let win = false

// characters
let baby = {
    name: "Hazel",
    hp: 1,
    attack: 0.5,
    precision: 0.01
}
let angryCat = {
    name: "Armand",
    hp: 25,
    attack: 10,
    precision: 0.99
}
let dragon = {
    name: "Péril",
    hp: 100,
    attack: 25,
    precision: 0.80
}
let oldMan = {
    name: "Michel Jean Sébastien Pierre",
    hp: 10,
    attack: 3,
    precision: 0.5
}

function tryAttack(rival, victim){
    let randFloat = Math.random()
    if (randFloat < rival.precision) {
        attack(rival, victim)
    } else {
        txt.innerHTML = rival.name + " a raté son attaque !"
    }
}
function attack(rival, victim){
    victim.hp -= rival.attack
    if (victim.hp < 0) {
        txt.innerHTML = rival.name + " attaque " + victim.name + " ! <br>"
         + victim.name + " perd " + rival.attack + " points de vie par " + rival.name + " ! <br>" 
         + victim.name + " n'a plus de points de vie, ce combattant est à terre !"
    } else {
        txt.innerHTML = rival.name + " attaque " + victim.name + " ! <br>"
        + victim.name + " perd " + rival.attack + " points de vie par " + rival.name + " ! <br>"
        + victim.name + " n'a plus que " + victim.hp + " points de vie !"
    }
}

function fight(fighter1, fighter2){
    if (win) {
        return txt.innerHTML = errorReset
    }
    if (!startFight) {
        txt.innerHTML = errorFight
    } else if (fighter1.hp > 0 && fighter2.hp > 0){
        turn++
        tryAttack(fighter1, fighter2)
    } else {
        txt.innerHTML = "Erreur. L'un des combattants est à terre. Veuillez terminer le combat."
    }
}

function playRound(fighter1, fighter2) {
    if (turn%2 == 0) {
        fight(fighter1,fighter2)
    } else fight(fighter2,fighter1)
}

function start(fighter1, fighter2){
    if (win) {
        return txt.innerHTML = errorReset
    }
    if (turn != 0) {
        txt.innerHTML = "Erreur. Les combattants doivent finir leur combat avant d'en commencer un nouveau."
    } else {
        startFight = true
        txt.innerHTML = fighter1.name + " VS " + fighter2.name
    }
}

function result(fighter1, fighter2) {
    if (win) {
        return txt.innerHTML = errorReset
    }
    if (!startFight) {
        return txt.innerHTML = errorFight
    }
    if (fighter1.hp > 0 && fighter2.hp > 0) {
        txt.innerHTML = "Erreur. Le combat n'est pas terminé."
    } else if (fighter1.hp < 0) {
        txt.innerHTML = "Le vainqueur est " + fighter2.name + " ! <br> Veuillez appuyer sur RESET pour refaire un combat."
        win = true
    } else {
        txt.innerHTML = "Le vainqueur est " + fighter1.name + " ! <br> Veuillez appuyer sur RESET pour refaire un combat."
        win = true
    }
}

function reset(fighter1, fighter2) {
    startFight = false
    turn = 0
    win = false
    fighter1.hp = resetHp[0]
    fighter2.hp = resetHp[1]
    txt.innerHTML = "Reset bien effectué."
}