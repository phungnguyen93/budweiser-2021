// import CharacterActuarial from "components/game/characters/CharacterActuarial";
// import CharacterClaims from "components/game/characters/CharacterClaims";

import AnotherCube from "modules/test/AnotherCube";
import ParticleFirework from "modules/website/ParticleFirework";
import ParticleHolder from "modules/website/ParticleHolder";



class DynamicClass {
    constructor(className, opts) {
        return new DynamicClass.classes[className](opts);
    }

    static classes = {
        AnotherCube,
        ParticleFirework,
        ParticleHolder

        // CharacterActuarial,
        // CharacterClaims,
    };
}

export default DynamicClass;