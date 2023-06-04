import * as alt from 'alt-client';
import mp from '../../shared/mp.js';
import { ClientPool } from '../ClientPool.js';
import { _WorldObject } from './WorldObject.js';
import {EntityGetterView} from '../../shared/pools/EntityGetterView';
import * as natives from 'natives';
export class _Blip extends _WorldObject {
    /** @param {alt.Blip} alt */
    constructor(alt) {
        super(alt);
        this.alt = alt;
    }

    get handle() {
        if (!this.alt.valid) return 0;
        return this.alt.scriptID;
    }

    type = 'blip';

    destroy() {
        this.alt.destroy();
    }

    get dimension() {
        if (this.alt.isRemote) return this.alt.getSyncedMeta(mp.prefix + 'dimension') ?? 0;
        return this.alt.getMeta(mp.prefix + 'dimension') ?? 0;
    }

    set dimension(value) {
        if (this.alt.isRemote) return;
        this.alt.setMeta(mp.prefix + 'dimension', value);
    }

    //#region Natives
    get setColour() {
        return this.setBlipColour; // setBlipColour
    }

    get setNameToPlayerName() {
        return this.setBlipNameToPlayerName; // setBlipNameToPlayerName
    }

    get setShowCone() {
        return this.setBlipShowCone; // setBlipShowCone
    }

    get setSecondaryColour() {
        return this.setBlipSecondaryColour; // setBlipSecondaryColour
    }

    get getInfoIdDisplay() {
        return this.getBlipInfoIdDisplay; // getBlipInfoIdDisplay
    }

    get getSprite() {
        return this.getBlipSprite; // getBlipSprite
    }

    get setCategory() {
        return this.setBlipCategory; // setBlipCategory
    }

    get setAsMissionCreator() {
        return this.setBlipAsMissionCreatorBlip; // setBlipAsMissionCreatorBlip
    }

    get setFade() {
        return this.setBlipFade; // setBlipFade
    }

    get setFlashesAlternate() {
        return this.setBlipFlashesAlternate; // setBlipFlashesAlternate
    }

    get setAlpha() {
        return this.setBlipAlpha; // setBlipAlpha
    }

    get getInfoIdIndex() {
        return this.getBlipInfoIdEntityIndex; // getBlipInfoIdEntityIndex
    }

    get setRoute() {
        return this.setBlipRoute; // setBlipRoute
    }

    get getCoords() {
        return this.getBlipCoords; // getBlipCoords
    }

    get setAsFriendly() {
        return this.setBlipAsFriendly; // setBlipAsFriendly
    }

    get getHudColour() {
        return this.getBlipColour; // getBlipHudColour
    }

    get setRouteColour() {
        return this.setBlipRouteColour; // setBlipRouteColour
    }

    get setDisplay() {
        return this.setBlipDisplay; // setBlipDisplay
    }

    get getAlpha() {
        return this.getBlipAlpha; // getBlipAlpha
    }

    get getInfoIdPickupIndex() {
        return this.getBlipInfoIdPickupIndex; // getBlipInfoIdPickupIndex
    }

    get isFlashing() {
        return this.isBlipFlashing; // isBlipFlashing
    }

    get doesExist() {
        return this.doesBlipExist; // doesBlipExist
    }

    get setFlashInterval() {
        return this.setBlipFlashInterval; // setBlipFlashInterval
    }

    get setPriority() {
        return this.setBlipPriority; // setBlipPriority
    }

    get setFlashes() {
        return this.setBlipFlashes; // setBlipFlashes
    }

    get setBright() {
        return this.setBlipBright; // setBlipBright
    }

    get setAsShortRange() {
        return this.setBlipAsShortRange; // setBlipAsShortRange
    }

    get getInfoIdType() {
        return this.getBlipInfoIdType; // getBlipInfoIdType
    }

    get setFlashTimer() {
        return this.setBlipFlashTimer; // setBlipFlashTimer
    }

    get isShortRange() {
        return this.isBlipShortRange; // isBlipShortRange
    }

    get getColour() {
        return this.getBlipColour; // getBlipHudColour
    }

    get setSprite() {
        return this.setBlipSprite; // setBlipSprite
    }

    get setHighDetail() {
        return this.setBlipHighDetail; // setBlipHighDetail
    }

    get isOnMinimap() {
        return this.isBlipOnMinimap; // isBlipOnMinimap
    }

    setNameFromTextFile(gxt) {
        return mp.game.hud.setBlipNameFromTextFile(this.handle, gxt);
    }

    get setCoords() {
        return this.setBlipCoords; // setBlipCoords
    }

    get setScale() {
        return this.setBlipScale; // setBlipScale
    }

    get setRotation() {
        return this.setBlipRotation; // setBlipRotation
    }

    getNextInfoId() {
        return natives.getNextBlipInfoId(this.handle);
    }

    getFirstInfoId() {
        return natives.getFirstBlipInfoId(this.handle);
    }

    isMissionCreator() {
        return natives.isMissionCreatorBlip(this.handle);
    }

    hideNumberOn() {
        return natives.hideNumberOnBlip(this.handle);
    }

    showNumberOn() {
        return natives.showNumberOnBlip(this.handle);
    }

    setShowHeadingIndicator(state) {
        return natives.showHeadingIndicatorOnBlip(this.handle, state);
    }

    pulse() {
        return natives.pulseBlip(this.handle);
    }

    addTextComponentSubstringName() {
        return natives.addTextComponentSubstringBlipName(this.handle);
    }

    endTextCommandSetName() {
        return natives.endTextCommandSetBlipName(this.handle);
    }
    //#endregion
}

Object.defineProperty(alt.Blip.prototype, 'mp', {
    get() {
        return this._mp ??= new _Blip(this);
    }
});

mp.Blip = _Blip;

mp.blips = new ClientPool(EntityGetterView.fromClass(alt.Blip));

mp.blips.new = function(sprite, position, params = {}) {
    let blip;
    switch(sprite) {
        case 9:
            blip = new alt.RadiusBlip(position.x, position.y, position.z, params.radius ?? 100);
            break;
        case 5: {
            const side = (params.radius ?? 50) * 2;
            blip = new alt.AreaBlip(position.x, position.y, position.z, side, side);
            blip.shortRange = false;
            // TODO: better fix for area blip issues
            blip.sprite = 0;
            break;
        }
        default:
            blip = new alt.PointBlip(position.x, position.y, position.z);
            blip.sprite = sprite;
    }

    if ('name' in params) {
        blip.name = params.name;
    }
    if ('scale' in params) blip.scale = params.scale;
    if ('color' in params) blip.color = params.color;
    if ('alpha' in params) blip.alpha = params.alpha;
    // TODO: draw distance
    if ('shortRange' in params && sprite !== 5) blip.shortRange = params.shortRange;
    if ('rotation' in params) blip.heading = params.rotation;
    blip.mp.dimension = params.dimension ?? 0;
    natives.setBlipDisplay(blip.scriptID, 0);

    return blip.mp;
};

if (mp._main) {
    alt.setInterval(() => {
        const playerDim = alt.Player.local.dimension;
        for (const blip of alt.Blip.all) {
            const dim = blip.mp.dimension;
            const state = dim === -1 ? true : dim === playerDim;
            if (state !== blip.mp._lastState) {
                console.log('Changing state of blip', blip.id, 'to', state);
                natives.setBlipDisplay(blip.scriptID, state ? 2 : 0);
                blip.mp._lastState = state;
                mp.events.dispatch(state ? 'entityStreamIn' : 'entityStreamOut', blip);
            }
        }
    }, 500);
}
