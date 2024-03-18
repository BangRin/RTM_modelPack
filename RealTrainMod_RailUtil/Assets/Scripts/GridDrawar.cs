using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class GridDrawar : MonoBehaviour
{
    public LineRenderer lr;
    public float sr, sc;
    public int rowCount, colCount;
    public float gridSize;

    void OnValidate()
    {
        if (rowCount + colCount > 0)
        {
            makeGrid(lr, sr, sc, rowCount, colCount);
        }
    }

    void Update()
    {
        if (Input.GetMouseButtonDown(0)) // 마우스 왼쪽 버튼 클릭 감지
        {
            RaycastHit hit;
            Ray ray = Camera.main.ScreenPointToRay(Input.mousePosition);

            if (Physics.Raycast(ray, out hit))
            {
                Vector3 point = hit.point;
                GetGridCoordinate(point);
            }
        }
    }

    void GetGridCoordinate(Vector3 worldPosition)
    {
        int xCoord = Mathf.FloorToInt((worldPosition.x - sr) / gridSize);
        int zCoord = Mathf.FloorToInt((worldPosition.z - sc) / gridSize);

        // 클릭된 그리드 좌표를 콘솔에 출력 (실제 구현에서는 이 정보를 원하는 대로 사용하세요)
        Debug.Log($"Grid Coordinates: ({xCoord}, {zCoord})");
    }

    void initLineRenderer(LineRenderer lr)
    {
        lr.startWidth = lr.endWidth = 0.1f;
        lr.material.color = Color.green;
    }

    void makeGrid(LineRenderer lr, float sr, float sc, int rowCount, int colCount)
    {
        List<Vector3> gridPos = new List<Vector3>();

        float ec = sc + colCount * gridSize;

        gridPos.Add(new Vector3(sr, this.transform.position.y, sc));
        gridPos.Add(new Vector3(sr, this.transform.position.y, ec));

        int toggle = -1;
        Vector3 currentPos = new Vector3(sr, this.transform.position.y, ec);
        for (int i = 0; i < rowCount; i++)
        {
            Vector3 nextPos = currentPos;

            nextPos.x += gridSize;
            gridPos.Add(nextPos);

            nextPos.z += (colCount * toggle * gridSize);
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

            nextPos.z += (colToggle * gridSize);
            gridPos.Add(nextPos);

            nextPos.x += (rowCount * toggle * gridSize);
            gridPos.Add(nextPos);

            currentPos = nextPos;
            toggle *= -1;
        }

        lr.positionCount = gridPos.Count;
        lr.SetPositions(gridPos.ToArray());
    }

    void Start()
    {
        lr = this.GetComponent<LineRenderer>();
        initLineRenderer(lr);

        makeGrid(lr, sr, sc, rowCount, colCount);
    }
}