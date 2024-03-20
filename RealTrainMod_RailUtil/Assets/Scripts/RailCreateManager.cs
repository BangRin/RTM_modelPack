using System.Collections;
using System.Collections.Generic;
using Unity.VisualScripting;
using UnityEngine;

public class RailCreateManager : Singleton<RailCreateManager>
{
    Vector3 ConvertMinecraftToUnityCoords(int x, int y, int z)
    {
        //Minecraft Coordinates to Unity Coords
        return new Vector3(x, y, -z);
    }

    

    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}
