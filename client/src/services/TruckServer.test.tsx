import axios from 'axios';
import { getTruckByLicense } from './TruckServer';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('getTruckByLicense', () => {
    it("fetches data from getTruckByLicense with no errors", async () => {
        mockedAxios.get.mockImplementationOnce(() =>
            Promise.resolve({
                data: { results: ["data"] }
            })
        );

        const truckData = await getTruckByLicense("88CA88");

        expect(truckData).toEqual({ results: ["data"] });
        expect(mockedAxios.get).toHaveBeenCalledTimes(1);
        expect(mockedAxios.get).toHaveBeenCalledWith(
            "http://localhost:8081/api/v1/truck/license",
            {
                params: {
                    license: "88CA88"
                }
            }
        );
    });

    it('fetches erroneously data from getTruckByLicense', async () => {
        const errorMessage = 'Network Error';
     
        mockedAxios.get.mockImplementationOnce(() =>
          Promise.reject(new Error(errorMessage)),
        );
      });
});