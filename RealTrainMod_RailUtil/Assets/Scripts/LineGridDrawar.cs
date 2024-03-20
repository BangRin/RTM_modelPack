using System.Collections.Generic;
using UnityEngine;

public class LineGridDrawar : MonoBehaviour
{
    public LineRenderer lr;
    public float sr, sc;

    public GameObject cubePrefab; // Inspector에서 할당
    public int rows = 5; 
    public int cols = 5; 
    public float cubeSize = 1.0f; // 큐브의 크기

    void Start()
    {
        lr = this.GetComponent<LineRenderer>();
        initLineRenderer(lr);
        makeGrid(lr, sr, sc, rows, cols);
    }

    void initLineRenderer(LineRenderer lr)
    {
        lr.startWidth = lr.endWidth = 0.01f;
        lr.material.color = Color.yellow;
    }

    void makeGrid(LineRenderer lr, float sr, float sc, int rowCount, int colCount)
    {
        List<Vector3> gridPos = new List<Vector3>();

        float ec = sc + colCount * cubeSize;

        gridPos.Add(new Vector3(sr, this.transform.position.y, sc));
        gridPos.Add(new Vector3(sr, this.transform.position.y, ec));

        int toggle = -1;
        Vector3 currentPos = new Vector3(sr, this.transform.position.y, ec);
        for (int i = 0; i < rowCount; i++)
        {
            Vector3 nextPos = currentPos;

            nextPos.x += cubeSize;
            gridPos.Add(nextPos);

            nextPos.z += (colCount * toggle * cubeSize);
            gridPos.Add(nextPos);

            currentPos = nextPos;
            toggle *= -1;
        }

        currentPos.x = sr;
        gridPos.Add(currentPos);

        int colToggle = toggle = 1;
        if (currentPos.z == ec) colToggle = -1;

        for (int i = 0; i < colCount; i++)
        {
            Vector3 nextPos = currentPos;

            nextPos.z += (colToggle * cubeSize);
            gridPos.Add(nextPos);

            nextPos.x += (rowCount * toggle * cubeSize);
            gridPos.Add(nextPos);

            currentPos = nextPos;
            toggle *= -1;
        }

        lr.positionCount = gridPos.Count;
        lr.SetPositions(gridPos.ToArray());
    }
}
