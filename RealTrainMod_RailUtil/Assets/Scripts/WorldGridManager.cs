using System.Collections.Generic;
using UnityEngine;

public class WorldGridManager : MonoBehaviour
{
    public int gridSize = 3000; // 전체 그리드의 크기 조정
    public int subGridSize = 30; // 하위 그리드의 크기 조정
    public Vector3 calibrationPos; // 위치 보정
    int cubeSize = 1;
    public LineRenderer lineRendererPrefab;

    private Dictionary<Vector2, LineRenderer> subGrids = new Dictionary<Vector2, LineRenderer>();
    private Vector3 lastCamPosition;

    void Start()
    {
        GenerateSubGrids();
        lastCamPosition = Camera.main.transform.position;
    }

    void Update()
    {
        if (Vector3.Distance(Camera.main.transform.position, lastCamPosition) > 1.0f)
        {
            UpdateVisibleSubGrids();
            lastCamPosition = Camera.main.transform.position;
        }
    }

    void GenerateSubGrids()
    {
        for (int x = 0; x < gridSize; x += subGridSize)
        {
            for (int z = 0; z < gridSize; z += subGridSize)
            {
                LineRenderer lr = Instantiate(lineRendererPrefab, this.transform);
                lr.gameObject.SetActive(false); 
                InitLineRenderer(lr);

                DrawSubGrid(lr, x, z, subGridSize, calibrationPos);
                Vector2 key = new Vector2(x, z);
                subGrids[key] = lr;
            }
        }
    }

    void InitLineRenderer(LineRenderer lr)
    {
        lr.startWidth = lr.endWidth = 0.05f;
        lr.material.color = Color.yellow;
    }

    void UpdateVisibleSubGrids()
    {
        Camera cam = Camera.main;
        float camHeight = cam.transform.position.y;
        float fov = cam.fieldOfView;
        float visibleRange = camHeight * Mathf.Tan(fov * Mathf.Deg2Rad / 2);
        float minvisibleRange = 20f;

        visibleRange = Mathf.Max(visibleRange, minvisibleRange);

        foreach (var keyValuePair in subGrids)
        {
            Vector2 gridPos = keyValuePair.Key;
            LineRenderer lr = keyValuePair.Value;

            
            Vector3 gridCenter = new Vector3(gridPos.x + subGridSize / 2.0f, 0, gridPos.y + subGridSize / 2.0f) + calibrationPos;
            float distance = Vector3.Distance(new Vector3(cam.transform.position.x, 0, cam.transform.position.z), gridCenter);

            lr.gameObject.SetActive(distance <= visibleRange);
        }
    }

    void DrawSubGrid(LineRenderer lr, float sr, float sc, int size, Vector3 offset)
    {
        List<Vector3> gridPos = new List<Vector3>();
        float ec = sc + size; 
        float er = sr + size; 

        Vector3 startPosition = new Vector3(sr, 0, sc) + offset;
        Vector3 endPosition = new Vector3(er, 0, ec) + offset;

        gridPos.Add(new Vector3(startPosition.x, offset.y, startPosition.z));
        gridPos.Add(new Vector3(startPosition.x, offset.y, endPosition.z));

        int toggle = -1;
        Vector3 currentPos = new Vector3(startPosition.x, offset.y, endPosition.z);
        for (int i = 0; i < size; i++)
        {
            Vector3 nextPos = currentPos;

            nextPos.x += cubeSize;
            gridPos.Add(nextPos);

            nextPos.z += (size * toggle * cubeSize);
            gridPos.Add(nextPos);

            currentPos = nextPos;
            toggle *= -1;
        }

        currentPos.x = startPosition.x;
        gridPos.Add(currentPos);

        int colToggle = toggle = 1;
        if (currentPos.z == endPosition.z) colToggle = -1;

        for (int i = 0; i < size; i++)
        {
            Vector3 nextPos = currentPos;

            nextPos.z += (colToggle * cubeSize);
            gridPos.Add(nextPos);

            nextPos.x += (size * toggle * cubeSize);
            gridPos.Add(nextPos);

            currentPos = nextPos;
            toggle *= -1;
        }

        lr.positionCount = gridPos.Count;
        lr.SetPositions(gridPos.ToArray());
    }
}

