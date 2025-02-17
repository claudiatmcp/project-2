import React from "react";
import dragon from "../assets/wp4786826.png";
import diceImg from "../assets/dice3.png";

//importing images to display
import barbarian from "../assets/barbarian.JPG";
import bard from "../assets/bard.JPG";
import cleric from "../assets/cleric.JPG";
import druid from "../assets/druid.JPG";
import fighter from "../assets/fighter.JPG";
import monk from "../assets/monk.JPG";
import paladin from "../assets/paladin.JPG";
import ranger from "../assets/ranger.JPG";
import rogue from "../assets/rogue.JPG";
import sorcerer from "../assets/sorcerer.JPG";
import warlock from "../assets/warlock.JPG";
import wizard from "../assets/wizard.JPG";

function Home() {
  const [classes, updateClasses] = React.useState(undefined);
  const [races, updateRaces] = React.useState(undefined);
  const [skills, updateSkills] = React.useState(undefined);

  const [name, updateName] = React.useState("");
  const [randomClass, updateRandomClass] = React.useState(undefined);
  const [randomRace, updateRandomRace] = React.useState(undefined);
  const [randomSkill, updateRandomSkill] = React.useState(undefined);
  const [classInfo, updateClassInfo] = React.useState(undefined);
  const [renderClassInfo, updateRenderClassInfo] = React.useState([]);
  const [hitDie, updateHitDie] = React.useState(undefined);
  const [raceInfo, updateRaceInfo] = React.useState(undefined);
  const [raceDisplay, updateRaceDisplay] = React.useState(undefined);
  const [skillInfo, updateSkillInfo] = React.useState(undefined);
  const [skillDisplay, updateSkillDisplay] = React.useState(undefined);
  const [classImg, updateClassImg] = React.useState(undefined);

  React.useEffect(() => {
    //fetching classes
    async function fetchClasses() {
      const resp = await fetch("https://www.dnd5eapi.co/api/classes");
      const classes = await resp.json();
      updateClasses(classes);
    }
    //fetching races
    async function fetchRaces() {
      const respTwo = await fetch("https://www.dnd5eapi.co/api/races");
      const races = await respTwo.json();
      updateRaces(races);
    }
    //fetching skills
    async function fetchSkills() {
      const respThree = await fetch("https://www.dnd5eapi.co/api/skills");
      const skills = await respThree.json();
      updateSkills(skills);
    }
    fetchClasses();
    fetchRaces();
    fetchSkills();
  }, []);
  //fetching individual class information
  async function fetchClassInfo(randomClass) {
    const respFour = await fetch(
      `https://www.dnd5eapi.co/api/classes/${randomClass.index}`
    );
    const classInfo = await respFour.json();
    updateClassInfo(classInfo);
    displayClassInfoFunction(classInfo);
    hitDieDisplay(classInfo);
  }
  //fetching individual race information
  async function fetchRaceInfo(randomRace) {
    const respFive = await fetch(
      `https://www.dnd5eapi.co/api/races/${randomRace.index}`
    );
    const raceInfo = await respFive.json();
    updateRaceInfo(raceInfo);
  }
  async function fetchSkillInfo(randomSkill) {
    const respSix = await fetch(
      `https://www.dnd5eapi.co/api/skills/${randomSkill.index}`
    );
    const skillInfo = await respSix.json();
    updateSkillInfo(skillInfo);
  }

  //GENERATING A RANDOM CHARACTER WITH RANDOM CLASS, RACE & SKILL
  function generateCharacter() {
    const classConst =
      classes.results[Math.floor(Math.random() * classes.results.length)];
    updateRandomClass(classConst);
    fetchClassInfo(classConst);
    displayingClassImg(classConst);
    // updateRandomClass(randomClass)
    const raceConst =
      races.results[Math.floor(Math.random() * races.results.length)];
    updateRandomRace(raceConst);
    fetchRaceInfo(raceConst);
    // updateRandomRace(randomRace)
    const skillConst =
      skills.results[Math.floor(Math.random() * skills.results.length)];
    updateRandomSkill(skillConst);
    fetchSkillInfo(skillConst);
    // updateRandomSkill(randomSkill)
  }
  //DISPLAYING THE STARTING EQUIPMENT AND HIT DIE OF A CHARACTER
  function displayClassInfoFunction(classInfo) {
    if (classInfo.starting_equipment.length !== 0) {
      updateRenderClassInfo(
        classInfo.starting_equipment.map((elem) => (
          <li key={elem.equipment.index}>{elem.equipment.name}</li>
        ))
      );
      // updateRenderClassInfo(renderClassInfo)
    } else {
      updateRenderClassInfo(
        <li>There is no starting equipment for this class.</li>
      );
      // updateRenderClassInfo(renderClassInfo)
    }
    updateHitDie(classInfo.hit_die);
  }
  //TOGGLE DISPLAY BUTTONS
  function hitDieDisplay() {
    updateHitDie(!hitDie);
  }
  function raceInfoDisplay() {
    updateRaceDisplay(!raceDisplay);
  }
  function skillInfoDisplay() {
    updateSkillDisplay(!skillDisplay);
  }
  //handle input name
  function handleChange(e) {
    updateName(e.target.value);
  }
  function addName(event) {
    event.preventDefault();
    console.log("clicked!", name);
    updateName(name);
  }
  function displayingClassImg(randomClass) {
    if (randomClass.index === "barbarian") {
      updateClassImg(barbarian);
    }
    if (randomClass.index === "bard") {
      updateClassImg(bard);
    }
    if (randomClass.index === "cleric") {
      updateClassImg(cleric);
    }
    if (randomClass.index === "druid") {
      updateClassImg(druid);
    }
    if (randomClass.index === "fighter") {
      updateClassImg(fighter);
    }
    if (randomClass.index === "monk") {
      updateClassImg(monk);
    }
    if (randomClass.index === "paladin") {
      updateClassImg(paladin);
    }
    if (randomClass.index === "ranger") {
      updateClassImg(ranger);
    }
    if (randomClass.index === "rogue") {
      updateClassImg(rogue);
    }
    if (randomClass.index === "sorcerer") {
      updateClassImg(sorcerer);
    }
    if (randomClass.index === "warlock") {
      updateClassImg(warlock);
    }
    if (randomClass.index === "wizard") {
      updateClassImg(wizard);
    }
  }
  return (
    <>
      <div className="headings">
        <h1>A Dungeons &amp; Dragons</h1>
        <h2>Character Builder</h2>
      </div>
      <div className="image">
        <img className="dragon" src={dragon} />
        <p className="welcome-p">
          <span className="welcome-span">
            Welcome to the D&amp;D Character Builder!
          </span>{" "}
          <br /> <br /> <br />
          <i>About DnD:</i>
          <br />
          <br />
          Dungeons &amp; Dragons is a structured, yet fundamentally open-ended
          role-playing game.
          <br />
          It is normally played indoors with the participants seated around a
          tabletop. Typically, one player takes on the role of Dungeon Master
          (DM) <br /> while the others each control a single character,
          representing an individual in a fictional setting.
          <br />
          When working together as a group, the player characters (PCs) <br />
          are often described as a &quot;party&quot; of adventurers, with each
          member often having their own area of specialty which contributes to
          the success of the whole.
          <br />
          <br />
          During the course of play, each player directs the actions of their
          character and their interactions with other characters in the game.
          <br /> This activity is performed through the verbal impersonation of
          the characters by the players, while employing a variety of social{" "}
          <br /> and other useful cognitive skills, such as logic, basic
          mathematics and imagination.
          <br />
          A game often continues over a series of meetings to complete a single
          adventure,
          <br /> and longer into a series of related gaming adventures, called a
          &quot;campaign&quot;. In 2004, D&amp;D remained the best-known, <br />{" "}
          and best-selling, role-playing game in the US, with an estimated 20
          million people having played the game,
          <br />
          and more than US$1 billion in book and equipment sales worldwide.
          <br /> The year 2017 had &quot;the most number of players in its
          history—12 million to 15 million
          <br /> in North America alone&quot;. D&amp;D 5th edition sales
          &quot;were up 41 percent in 2017 from the year before, <br />
          and soared another 52 percent in 2018, the game&quot;s biggest sales
          year yet&quot;.
          <br />
          The game has been supplemented by many pre-made adventures, <br />
          as well as commercial campaign settings suitable for use by regular
          gaming groups. <br />
          D&amp;D is known beyond the game itself for other D&amp;D-branded
          products, <br />
          references in popular culture, and some of the controversies that have
          surrounded it.
          <br />
          The game has won multiple awards and has been translated into many
          languages.
          <br />
          <br />
          <i>
            <b>About this Project:</b>
          </i>
          <br />
          <br />
          The purpose of this project is to help players pick a character using
          a randomization tool. <br />
          Saving players time and possibly making the campaign more interesting.
          <br />
          Click the button below to generate a random class, race and skill set.{" "}
          You can generate as many times as you like. <br />
          Once satisfied, you can attach your name to your chosen character, and
          add up to four favorites. One for each player.
          <br />
          Happy playing!
          <br />
        </p>
      </div>
      <div className="form">
        <form onSubmit={addName}>
          <label>
            <input
              type="text"
              name="name"
              placeholder="Enter player name"
              onChange={handleChange}
              value={name}
            />
          </label>
          <input type="submit" value="&#8594;" />
        </form>
      </div>
      <div className="button-container">
        <div className="button-border">
          <h3>Click below to Generate a character</h3>
          <div className="button-1-container">
            <button className="button-1" onClick={generateCharacter}>
              <img className="dice" src={diceImg} />
            </button>
          </div>
        </div>
      </div>
      {/* CHARACTER INFORMATION */}
      {randomRace && (
        <div>
          {" "}
          <br />
          <div className="image-div">
            <img src={classImg}></img>
          </div>
          <p className="user-result">
            <li>{name}</li> <br />
            You&apos;ve been given the race &nbsp;{" "}
            <b>
              <span>{randomRace.name}</span>
            </b>{" "}
            with the class of &nbsp;{" "}
            <b>
              <span>{randomClass.name}</span>{" "}
            </b>{" "}
            and the skills &nbsp;{" "}
            <b>
              <span>{randomSkill.name}</span>
            </b>
            .
          </p>
          <div className="info-container">
            <button className="info" onClick={hitDieDisplay}>
              Expand class
            </button>
            <button className="info" onClick={raceInfoDisplay}>
              Expand race
            </button>
            <button className="info" onClick={skillInfoDisplay}>
              Expand skills
            </button>
          </div>
        </div>
      )}

      {/* CLASSES INFORMATION */}
      {hitDie && (
        <div className="class-section">
          <h4>More about the {randomClass.name} class</h4>
          {randomClass.name} has the following starting equipment:{" "}
          {renderClassInfo}
          <br />
          {randomClass.name} has a <li>{classInfo.hit_die}</li> hit die level.
          <p>
            Hit die refers to the number of dice rolled to calculate how many
            hit points a character begins to play with. This determines how
            difficult they are to kill.
          </p>
        </div>
      )}
      {/* RACES INFORMATION */}
      {raceDisplay && (
        <div className="race-section">
          <h4>More about the {randomRace.name} race</h4>
          <p className="titles">Age:</p>
          {raceInfo.age}
          <p className="titles">Alignment:</p> {raceInfo.alignment}
          <p className="titles">Languages:</p>
          {raceInfo.language_desc}
          <p className="titles">Size:</p> {raceInfo.size_description}
          <p className="titles">Speed:</p> {raceInfo.speed}
        </div>
      )}
      {/* SKILLS INFORMATION */}
      {skillDisplay && (
        <div className="skills-section">
          <h4>More about the {randomSkill.name} skill</h4>
          <p className="titles">{randomSkill.name}:</p>
          {skillInfo.desc[0]}
        </div>
      )}
    </>
  );
}
export default Home;
