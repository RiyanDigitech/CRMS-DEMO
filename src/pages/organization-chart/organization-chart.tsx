import { Tree, TreeNode } from "react-organizational-chart";

const OrganizationChart = () => {
  return (
    <div className="w-full  max-w-[90%] sm:max-w-[600px] md:max-w-[70%] lg:max-w-[95%] mx-auto overflow-auto p-3">
      <Tree
        label={
          <div className=" cursor-pointer bg-[#008444] text-white p-4 rounded-lg shadow-lg">
            Head Of Sales
          </div>
        }
      >
        <TreeNode
          label={
            <div
              className=" cursor-pointer 
-pointer bg-[#008444] text-white p-4 rounded-lg shadow-lg"
            >
              BU# 1
            </div>
          }
        >
          <TreeNode
            label={
              <div className=" cursor-pointer bg-[#008444] text-white p-4 rounded-lg shadow-lg">
                NSM 1
              </div>
            }
          >
            <TreeNode
              label={
                <div className=" cursor-pointer bg-[#ff8548] text-white p-4 rounded-lg shadow-lg">
                  RSM 1
                </div>
              }
            >
              <TreeNode
                label={
                  <div className=" cursor-pointer bg-[#ff8548] text-white p-4 rounded-lg shadow-lg">
                    BM 1
                  </div>
                }
              />{" "}
              <TreeNode
                label={
                  <div className=" cursor-pointer bg-[#ff8548] text-white p-4 rounded-lg shadow-lg">
                    BM 2
                  </div>
                }
              />
            </TreeNode>
            <TreeNode
              label={
                <div className=" cursor-pointer bg-[#ff8548] text-white p-4 rounded-lg shadow-lg">
                  RSM 2
                </div>
              }
            >
              <TreeNode
                label={
                  <div className=" cursor-pointer bg-[#ff8548] text-white p-4 rounded-lg shadow-lg">
                    BM 3
                  </div>
                }
              />{" "}
              <TreeNode
                label={
                  <div className=" cursor-pointer bg-[#ff8548] text-white p-4 rounded-lg shadow-lg">
                    BM 4
                  </div>
                }
              />
            </TreeNode>
          </TreeNode>

          <TreeNode
            label={
              <div className=" cursor-pointer bg-[#008444] text-white p-4 rounded-lg shadow-lg">
                NSM 4
              </div>
            }
          >
            <TreeNode
              label={
                <div className=" cursor-pointer bg-[#ff8548] text-white p-4 rounded-lg shadow-lg">
                  RSM 3
                </div>
              }
            >
              <TreeNode
                label={
                  <div className=" cursor-pointer bg-[#ff8548] text-white p-4 rounded-lg shadow-lg">
                    BM 5
                  </div>
                }
              />{" "}
              <TreeNode
                label={
                  <div className=" cursor-pointer bg-[#ff8548] text-white p-4 rounded-lg shadow-lg">
                    BM 6
                  </div>
                }
              />
            </TreeNode>

            <TreeNode
              label={
                <div className=" cursor-pointer bg-[#ff8548] text-white p-4 rounded-lg shadow-lg">
                  RSM 4
                </div>
              }
            >
              <TreeNode
                label={
                  <div className=" cursor-pointer bg-[#ff8548] text-white p-4 rounded-lg shadow-lg">
                    BM 7
                  </div>
                }
              />
              <TreeNode
                label={
                  <div className=" cursor-pointer bg-[#ff8548] text-white p-4 rounded-lg shadow-lg">
                    BM 8
                  </div>
                }
              />
            </TreeNode>
          </TreeNode>
        </TreeNode>
        <TreeNode
          label={
            <div className=" cursor-pointer bg-[#008444] text-white p-4 rounded-lg shadow-lg">
              BU# 2
            </div>
          }
        >
          <TreeNode
            label={
              <div className=" cursor-pointer bg-[#008444] text-white p-4 rounded-lg shadow-lg">
                NSM 3
              </div>
            }
          >
            <TreeNode
              label={
                <div className=" cursor-pointer bg-[#ff8548] text-white p-4 rounded-lg shadow-lg">
                  RSM 5
                </div>
              }
            >
              <TreeNode
                label={
                  <div className=" cursor-pointer bg-[#ff8548] text-white p-4 rounded-lg shadow-lg">
                    BM 9
                  </div>
                }
              />{" "}
              <TreeNode
                label={
                  <div className=" cursor-pointer bg-[#ff8548] text-white p-4 rounded-lg shadow-lg">
                    BM 10
                  </div>
                }
              />
            </TreeNode>
            <TreeNode
              label={
                <div className=" cursor-pointer bg-[#ff8548] text-white p-4 rounded-lg shadow-lg">
                  RSM 6
                </div>
              }
            >
              <TreeNode
                label={
                  <div className=" cursor-pointer bg-[#ff8548] text-white p-4 rounded-lg shadow-lg">
                    BM 11
                  </div>
                }
              />{" "}
              <TreeNode
                label={
                  <div className=" cursor-pointer bg-[#ff8548] text-white p-4 rounded-lg shadow-lg">
                    BM 12
                  </div>
                }
              />
            </TreeNode>
          </TreeNode>

          <TreeNode
            label={
              <div className=" cursor-pointer bg-[#008444] text-white p-4 rounded-lg shadow-lg">
                NSM 4
              </div>
            }
          >
            <TreeNode
              label={
                <div className=" cursor-pointer bg-[#ff8548] text-white p-4 rounded-lg shadow-lg">
                  RSM 7
                </div>
              }
            >
              <TreeNode
                label={
                  <div className=" cursor-pointer bg-[#ff8548] text-white p-4 rounded-lg shadow-lg">
                    BM 13
                  </div>
                }
              />{" "}
              <TreeNode
                label={
                  <div className=" cursor-pointer bg-[#ff8548] text-white p-4 rounded-lg shadow-lg">
                    BM 14
                  </div>
                }
              />
            </TreeNode>

            <TreeNode
              label={
                <div className=" cursor-pointer bg-[#ff8548] text-white p-4 rounded-lg shadow-lg">
                  RSM 8
                </div>
              }
            >
              <TreeNode
                label={
                  <div className=" cursor-pointer bg-[#ff8548] text-white p-4 rounded-lg shadow-lg">
                    BM 15
                  </div>
                }
              />
              <TreeNode
                label={
                  <div className=" cursor-pointer bg-[#ff8548] text-white p-4 rounded-lg shadow-lg">
                    BM 16
                  </div>
                }
              />
            </TreeNode>
          </TreeNode>
        </TreeNode>
      </Tree>
    </div>
  );
};

export default OrganizationChart;
