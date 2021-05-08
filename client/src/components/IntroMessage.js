import GameTitle from './GameTitle'

export default function IntroMessage() {
    return (
        <div>
            <GameTitle />
            <div className="intro-message">
                <p>
                    In 1954, six strangers arrive by ominous invitation at a secluded New England mansion. Greeted by the butler and the maid, each guest receives a pseudonym: Colonel Mustard, Mrs. White, Mrs. Peacock, Rev. Green, Professor Plum, and Miss Scarlett.
            </p>
                <p>
                    A seventh guest arrives during dinner—Dr. Black, whom the butler reveals has been blackmailing the others: Mrs. Peacock is accused of taking bribes for her husband, a US senator, but denies any wrongdoing and claims she has paid the blackmail to keep the scandal quiet; Mrs. White is suspected in the death of her husband, a nuclear physicist; Professor Plum has lost his medical license due to an affair with a patient; Miss Scarlett runs an underground brothel in Washington, D.C.; Colonel Mustard, though initially suspected of being one of Miss Scarlett's patrons, is a war profiteer; and Rev. Green is a homosexual, a secret that would cost him his preaching position if anyone found out.
            </p>
                <p>
                    During their discussion at the dinner table, the lights go off. A gunshot rings out, and the lights are turned back on to reveal Dr. Black apparently dead, without any indication at first glance as to how.
            </p>
                <p>
                    As a detective, it is your job to head to Dr Black’s mansion and find out: Who killed him? What weapon did they use? And where did it happen?
            </p>
                <a href="http://localhost:3000/rooms">Pick a room</a>
            </div>
        </div>

    )
}