import { createMarker, loadMapApi } from './GoogleMapsUtils';


describe('loadMapApi', () => {
    it('should sucessfuly load map api', () => {
        const googleMapScript = loadMapApi();
        expect(googleMapScript.src).toContain("https://maps.googleapis.com/maps/api/");
        expect(googleMapScript.defer).toBe(true);
        expect(googleMapScript.async).toBe(true);
    });
});